import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressBookActions from 'modules/AddressBookReducer';
import * as txListActions from 'modules/TxListReducer';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, RefreshControl, FlatList } from 'react-native';
import WalletHistoryComponent from 'components/WalletHistoryComponent';
import AddressBookMiniComponent from 'components/AddressBookMiniComponent';
import ToastComponent from 'components/ToastComponent';
import CardView from 'react-native-cardview';
import PlaceholderLayout from './PlaceholderLayout';
import * as etherApi from 'api/WalletHistory/etherscan-api';
import { convertTxListToAddressBookList } from 'api/AddressBook/AddressBookApi';
import PropTypes from 'prop-types';
import styles from './styles';

const ITEMTYPE_ALL = 0;
const ITEMTYPE_ROZ = 1;
const ITEMTYPE_ETH = 2;
const ITEMTYPE_ADDRESSBOOK = 3;
const PAGE_COUNT = 5;

class WalletHistoryScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            data: [],
            isData: true,
            extraData: [],
            itemType: 0,
            refreshing: false,
            addressBookShow: false,
            addressBookList: [],
            addressBookMap: {},
            address: '',
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', async payload => {
            if (payload.state.params) {
                //   주소록 데이터 가져오기
                const { itemType, address } = payload.state.params;
                this.setState({ addressBookShow: false, itemType, address, data: [] });
                this.getAddressData();
            } else {
                this.setState({ itemType: ITEMTYPE_ALL, data: [], addressBookShow: false });
                this.getData(ITEMTYPE_ALL, 1);
            }
        });
    }

    componentWillUnmount = () => {
        this.focusListener.remove();
    };

    onRefresh = () => {
        const { itemType } = this.state;
        this.setState({
            refreshing: true,
            page: 1,
        });
        this.getData(itemType, 1);
    };

    renderDetail = (rowData, sectionID, rowID) => {
        const { data } = this.state;
        const { navigation } = this.props;
        return <WalletHistoryComponent navigation={navigation} data={data[sectionID]} />;
    };

    getData = async (itemType, page) => {
        let { data, address } = this.state;
        const { addressBookStore, txListAction } = this.props;
        let txList = [];

        switch (itemType) {
            case ITEMTYPE_ALL:
                txList = await etherApi.getTxList(1, 10000);
                txListAction.setAllTxList(this.copyArray(txList));
                txList = txList.slice((page - 1) * PAGE_COUNT, page * PAGE_COUNT);
                break;
            case ITEMTYPE_ROZ:
                txList = await etherApi.getRozTxList(page, PAGE_COUNT);
                break;
            case ITEMTYPE_ETH:
                txList = await etherApi.getEthTxList(page, PAGE_COUNT);
                break;
            case ITEMTYPE_ADDRESSBOOK:
                txList = await etherApi.getTxListByAddress(page, PAGE_COUNT, address);
                break;
        }

        etherApi.setNickname(txList, addressBookStore.map);

        this.setState({
            data: page !== 1 ? data.concat(txList) : txList,
            refreshing: false,
            isData: page === 1 && txList.length === 0 ? false : true,
            page: page + 1,
        });
    };

    copyMap = map => {
        if (!map) {
            return map;
        }

        var newMap = map.constructor();

        for (var attr in map) {
            if (map.hasOwnProperty(attr)) {
                newMap[attr] = map[attr];
            }
        }

        return newMap;
    };

    copyArray = array => {
        let newAray = [];
        for (let i = 0; i < array.length; i++) {
            newAray.push(this.copyMap(array[i]));
        }

        return newAray;
    };

    getAddressData = () => {
        this.getData(ITEMTYPE_ADDRESSBOOK, 1);
    };

    setType = itemType => {
        const { txListStore, addressBookStore } = this.props;

        this.setState({
            itemType: itemType,
            addressBookShow: itemType === ITEMTYPE_ADDRESSBOOK ? true : false, //  주소록 on/off
            data: [],
        });

        if (itemType === ITEMTYPE_ADDRESSBOOK) {
            convertTxListToAddressBookList(txListStore.list, addressBookStore.map).then(addressBookList => {
                this.setState({
                    addressBookList: addressBookList,
                });
            });
            return;
        }

        this.getData(itemType, 1);
    };

    onActiveMini = address => {
        this.setState({ addressBookShow: false, address: address }, () => {
            this.getData(ITEMTYPE_ADDRESSBOOK, 1);
        });
    };

    renderFooter() {
        const { refreshing } = this.state;
        if (refreshing) {
            return <ActivityIndicator />;
        } else {
            return <Text />;
        }
    }

    render() {
        const { page, refreshing, data, itemType, addressBookShow, isData, addressBookList } = this.state;
        const { navigation } = this.props;
        const { lang } = this.props.navigation.getScreenProps('locale');
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.itemTypeLayout}>
                    <CardView cardElevation={5} cornerRadius={0} style={styles.typeLayout}>
                        <TouchableOpacity
                            style={[styles.alignCenter, itemType === ITEMTYPE_ALL && styles.typeSelected]}
                            onPress={() => {
                                this.setType(ITEMTYPE_ALL);
                            }}>
                            <Text style={[styles.textStyle, itemType === ITEMTYPE_ALL && styles.typeSelectedText]}>{lang.all}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.alignCenter, itemType === ITEMTYPE_ROZ && styles.typeSelected]}
                            onPress={() => {
                                this.setType(ITEMTYPE_ROZ);
                            }}>
                            <Text style={[styles.textStyle, itemType === ITEMTYPE_ROZ && styles.typeSelectedText]}>ROZ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.alignCenter, itemType === ITEMTYPE_ETH && styles.typeSelected]}
                            onPress={() => {
                                this.setType(ITEMTYPE_ETH);
                            }}>
                            <Text style={[styles.textStyle, itemType === ITEMTYPE_ETH && styles.typeSelectedText]}>ETH</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.alignCenter, itemType === ITEMTYPE_ADDRESSBOOK && styles.typeSelected]}
                            onPress={() => {
                                this.setType(ITEMTYPE_ADDRESSBOOK);
                            }}>
                            <Text style={[styles.textStyle, itemType === 3 && styles.typeSelectedText]}>{lang.addressBook}</Text>
                        </TouchableOpacity>
                    </CardView>
                </View>
                {addressBookShow ? (
                    <View style={styles.addressBookLayout}>
                        {/* 거래내역 조회 로직 */}
                        <AddressBookMiniComponent onActive={this.onActiveMini} addressBookList={addressBookList} />
                    </View>
                ) : (
                    <View style={styles.itemListLayout}>
                        {data.length > 0 ? (
                            <FlatList
                                data={data}
                                renderItem={({ item }) => <WalletHistoryComponent navigation={navigation} toast={this.toast} data={item} />}
                                keyExtractor={(item, index) => index.toString()}
                                removeClippedSubviews={false}
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
                                renderFooter={this.renderFooter}
                                onEndReached={() => {
                                    //  [임시조건 적용]
                                    if (data.length % PAGE_COUNT === 0) {
                                        this.getData(itemType, page);
                                    }
                                }}
                                onEndReachedThreshold={0.2}
                            />
                        ) : isData ? (
                            <PlaceholderLayout />
                        ) : (
                            <View style={styles.isEmptyLayout}>
                                <Text>NO DATA</Text>
                            </View>
                        )}
                    </View>
                )}
                <ToastComponent
                    ref={ref => {
                        this.toast = ref;
                    }}
                />
            </KeyboardAvoidingView>
        );
    }
}

WalletHistoryScreen.proptpes = {
    data: PropTypes.array,
    extraData: PropTypes.array,
    refreshing: PropTypes.bool,
    page: PropTypes.number,
    addressBookShow: PropTypes.bool,
    onRefresh: PropTypes.func,
    getData: PropTypes.func,
    getAddressData: PropTypes.func,
    setType: PropTypes.func,
    onActiveMini: PropTypes.func,
    renderDetail: PropTypes.func,
    renderFooter: PropTypes.func,
    addressBookList: PropTypes.array,
};

export default connect(
    state => ({
        addressBookStore: state.AddressBookReducer,
        txListStore: state.TxListReducer,
    }),
    dispatch => ({
        addressBookAction: bindActionCreators(addressBookActions, dispatch),
        txListAction: bindActionCreators(txListActions, dispatch),
    }),
)(WalletHistoryScreen);
