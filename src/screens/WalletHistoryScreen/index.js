/* eslint-disable react-native/no-inline-styles */
// /* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Text, /*FlatList,*/ TouchableOpacity, KeyboardAvoidingView, ActivityIndicator, RefreshControl } from 'react-native';
// import WalletHistoryComponent from 'components/WalletHistoryComponent';
import WalletHistoryComponent from 'components/WalletHistoryComponent';
import AddressBookMiniComponent from 'components/AddressBookMiniComponent';
import CardView from 'react-native-cardview';
import PropTypes from 'prop-types';
import styles from './styles';
import Timeline from 'react-native-timeline-flatlist';
import { getTxList, getRozTxList, getEthTxList } from 'api/etherscan-api';

const ITEMTYPE_ALL = 0;
const ITEMTYPE_ROZ = 1;
const ITEMTYPE_ETH = 2;
const ITEMTYPE_ADDRESSBOOK = 3;
const PAGE_COUNT = 5;

export default class WalletHistoryScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            data: [],
            extraData: [],
            itemType: 0,
            refreshing: false,
            addressBookShow: false,
            renderDetail: this.renderDetail,
        };

        // this.renderDetail = this.renderDetail.bind(this);
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', payload => {
            if (payload.state.params) {
                //   주소록 데이터 가져오기
                this.setState({ itemType: payload.state.params.itemType });
                this.getAddressData(payload.state.params.address);
            } else {
                this.getData(ITEMTYPE_ALL, 1);
            }
        });
    }

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
        // return <WalletHistoryComponent navigation={navigation} send={data[sectionID].send} status={data[sectionID].status} date={data[sectionID].ts} value={data[sectionID].value} />;
        return <WalletHistoryComponent navigation={navigation} data={data[sectionID]} />;
    };

    getData = async (itemType, page) => {
        let { data } = this.state;

        let txList = [];

        switch (itemType) {
            case ITEMTYPE_ALL:
                txList = await getTxList(page, PAGE_COUNT);
                break;
            case ITEMTYPE_ROZ:
                txList = await getRozTxList(page, PAGE_COUNT);
                break;
            case ITEMTYPE_ETH:
                txList = await getEthTxList(page, PAGE_COUNT);
                break;
            case ITEMTYPE_ADDRESSBOOK:
                break;
        }

        this.setState({
            data: page !== 1 ? data.concat(txList) : txList,
            refreshing: false,
            page: page + 1,
        });
    };

    getAddressData = address => {
        console.log('ADDRESS DATA ', address);
        this.setState({ addressBookShow: false });
    };

    setType = itemType => {
        this.setState({
            itemType: itemType,
            addressBookShow: itemType === ITEMTYPE_ADDRESSBOOK ? true : false, //  주소록 on/off
            data: [],
        });
        this.getData(itemType, 1);
    };

    onActiveMini = flag => {
        this.setState({ addressBookShow: flag });
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
        const { page, refreshing, data, itemType, addressBookShow } = this.state;
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.itemTypeLayout}>
                    <CardView cardElevation={5} cornerRadius={10} style={styles.typeLayout}>
                        <TouchableOpacity
                            style={[styles.alignCenter, itemType === ITEMTYPE_ALL && styles.typeSelected]}
                            onPress={() => {
                                this.setType(ITEMTYPE_ALL);
                            }}>
                            <Text style={[styles.textStyle, itemType === ITEMTYPE_ALL && styles.typeSelectedText]}>전체</Text>
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
                            <Text style={[styles.textStyle, itemType === 3 && styles.typeSelectedText]}>주소록</Text>
                        </TouchableOpacity>
                    </CardView>
                </View>
                {addressBookShow ? (
                    <View style={styles.addressBookLayout}>
                        {/* 거래내역 조회 로직 */}
                        <AddressBookMiniComponent onActive={this.onActiveMini} />
                    </View>
                ) : (
                    <View style={styles.itemListLayout}>
                        <Timeline
                            data={data}
                            circleSize={20}
                            timeContainerStyle={{ minWidth: 60 }}
                            timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
                            descriptionStyle={{ color: 'gray' }}
                            options={{
                                style: { paddingTop: 5 },
                                refreshControl: <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />,
                                renderFooter: this.renderFooter,
                                onEndReached: () => {
                                    this.getData(itemType, page);
                                },
                            }}
                            renderDetail={this.renderDetail}
                        />
                        {/* <FlatList
                            data={data}
                            renderItem={({ item }) => <WalletHistoryComponent navigation={navigation} send={item.send} status={item.status} date={item.date} value={item.value} />}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={this.state}
                            refreshing={refreshing}
                            onRefresh={() => {
                                this.onRefresh();
                            }}
                            onEndReached={() => {
                                this.getData(itemType, page);
                            }}
                            onEndReachedThreshold={0.2}
                        /> */}
                    </View>
                )}
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
};
