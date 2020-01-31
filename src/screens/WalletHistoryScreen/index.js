import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressBookActions from 'modules/AddressBookReducer';
import * as txListActions from 'modules/TxListReducer';
import { View, Text, TouchableOpacity, RefreshControl, FlatList, SafeAreaView } from 'react-native';
import { WalletHistoryComponent, AddressBookMiniComponent, ToastComponent, LoadComponent } from 'components';
import * as etherjs from 'api/etherjs';
import { convertTxListToAddressBookList } from 'api/AddressBook/AddressBookApi';
import PropTypes from 'prop-types';
import S from './styles';
import { Tx } from 'model/Tx';

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
            isLoad: false,
            extraData: [],
            itemType: 0,
            refreshing: false,
            addressBookShow: false,
            addressBookList: [],
            addressBookMap: {},
            address: '',
            pendingTxList: [],
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', async payload => {
            if (payload.state.params) {
                //   주소록 데이터 가져오기
                const { itemType, address } = payload.state.params;
                this.setState({ addressBookShow: false, itemType, address, data: [], isLoad: false });
                this.getAddressData();
            } else {
                this.setState({ itemType: ITEMTYPE_ALL, data: [], isLoad: false, addressBookShow: false });
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

    getPendingTxList = async () => {
        const { pendingHashList } = this.props.txListStore;
        const { txListAction } = this.props;

        let pendingTxList = [];

        for (let i = 0; i < pendingHashList.length; i++) {
            let tx = await etherjs.getTx(pendingHashList[i]);

            if (!tx || tx.blockNumber) {
                txListAction.removePendingTxList({ txId: pendingHashList[i] });
                continue;
            }

            pendingTxList.push(Tx.formPendingTxData(tx));
        }

        this.setState({
            pendingTxList: pendingTxList,
        });
    };

    getData = async (itemType, page) => {
        let { data, address } = this.state;
        const { addressBookStore, txListAction } = this.props;
        let txList = [];

        this.getPendingTxList();

        switch (itemType) {
            case ITEMTYPE_ALL:
                txList = await etherjs.getTxList(1, 10000);
                txListAction.setAllTxList(this.copyArray(txList));
                txList = txList.slice((page - 1) * PAGE_COUNT, page * PAGE_COUNT);
                break;
            case ITEMTYPE_ROZ:
                txList = await etherjs.getRozTxList(page, PAGE_COUNT);
                break;
            case ITEMTYPE_ETH:
                txList = await etherjs.getEthTxList(page, PAGE_COUNT);
                break;
            case ITEMTYPE_ADDRESSBOOK:
                txList = await etherjs.getTxListByAddress(page, PAGE_COUNT, address);
                break;
        }

        etherjs.setNickname(txList, addressBookStore.map);

        this.setState({
            data: page !== 1 ? data.concat(txList) : txList,
            refreshing: false,
            isLoad: true,
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
            isLoad: false,
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

    render() {
        const { page, refreshing, data, itemType, addressBookShow, isLoad, addressBookList, pendingTxList } = this.state;
        const { navigation } = this.props;
        const { lang } = this.props.navigation.getScreenProps('locale');
        return (
            <SafeAreaView style={S.ContainerView}>
                <View>
                    <View style={S.ItemTypeView}>
                        <TouchableOpacity
                            style={[S.ItemView, itemType === ITEMTYPE_ALL && S.TypeSelectedView]}
                            onPress={() => {
                                this.setType(ITEMTYPE_ALL);
                            }}>
                            <Text style={[S.ItemText, itemType === ITEMTYPE_ALL && S.TypeSelectedText]}>{lang.all}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[S.ItemView, itemType === ITEMTYPE_ROZ && S.TypeSelectedView]}
                            onPress={() => {
                                this.setType(ITEMTYPE_ROZ);
                            }}>
                            <Text style={[S.ItemText, itemType === ITEMTYPE_ROZ && S.TypeSelectedText]}>ROZ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[S.ItemView, itemType === ITEMTYPE_ETH && S.TypeSelectedView]}
                            onPress={() => {
                                this.setType(ITEMTYPE_ETH);
                            }}>
                            <Text style={[S.ItemText, itemType === ITEMTYPE_ETH && S.TypeSelectedText]}>ETH</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[S.ItemView, itemType === ITEMTYPE_ADDRESSBOOK && S.TypeSelectedView]}
                            onPress={() => {
                                this.setType(ITEMTYPE_ADDRESSBOOK);
                            }}>
                            <Text style={[S.ItemText, itemType === 3 && S.TypeSelectedText]}>{lang.addressBook}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {addressBookShow ? (
                    <View style={S.AddressBookView}>
                        {/* 거래내역 조회 로직 */}
                        <AddressBookMiniComponent onActive={this.onActiveMini} addressBookList={addressBookList} />
                    </View>
                ) : (
                    <View style={S.ItemListView}>
                        {data.length > 0 ? (
                            <FlatList
                                data={data}
                                ListHeaderComponent={
                                    <View>
                                        {pendingTxList.length > 0 &&
                                            pendingTxList.map((pendingItem, index) => {
                                                return <WalletHistoryComponent key={index} navigation={navigation} toast={this.toast} data={pendingItem} />;
                                            })}
                                    </View>
                                }
                                renderItem={({ item }) => <WalletHistoryComponent navigation={navigation} toast={this.toast} data={item} />}
                                keyExtractor={(item, index) => index.toString()}
                                removeClippedSubviews={false}
                                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
                                onEndReached={() => {
                                    //  [임시조건 적용]
                                    if (data.length % PAGE_COUNT === 0) {
                                        this.getData(itemType, page);
                                    }
                                }}
                                onEndReachedThreshold={0.2}
                            />
                        ) : (
                            <LoadComponent isLoad={isLoad} />
                        )}
                    </View>
                )}
                <ToastComponent
                    ref={ref => {
                        this.toast = ref;
                    }}
                />
            </SafeAreaView>
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
    getPendingTxList: PropTypes.func,
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
