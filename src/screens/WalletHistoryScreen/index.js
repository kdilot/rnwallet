// /* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import WalletHistoryComponent from 'components/WalletHistoryComponent';
import AddressBookMiniComponent from 'components/AddressBookMiniComponent';
import CardView from 'react-native-cardview';
import PropTypes from 'prop-types';
import styles from './styles';
import Timeline from 'react-native-timeline-flatlist';
import sampleData from './sampleData.json';
import moment from 'moment';
import { getTxList, getRozTxList, getEthTxList } from 'api/etherscan-api';

export default class WalletHistoryScreen extends Component {
    ITEMTYPE_ALL = 0;
    ITEMTYPE_ROZ = 1;
    ITEMTYPE_ETH = 2;
    ITEMTYPE_ADDRESSBOOK = 3;
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            data: [],
            extraData: [],
            itemType: 0,
            refreshing: false,
            addressBookShow: false,
        };

        // this.renderDetail = this.renderDetail.bind(this);
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', payload => {
            if (payload.state.params) {
                this.setState({ itemType: payload.state.params.itemType });
                this.getAddressData(payload.state.params.address);
            }
        });
        this.getData(this.ITEMTYPE_ALL, 1);
    }

    onRefresh = () => {
        const { itemType } = this.state;
        this.setState({
            refreshing: true,
            page: 1,
        });
        this.getData(itemType, 1);
    };

    /* renderDetail(rowData, sectionID, rowID) {
        const { data } = this.state;
        const { navigation } = this.props;

        console.log(data[sectionID]);

        return <View>{<WalletHistoryComponent navigation={navigation} send={data[sectionID].send} status={data[sectionID].status} date={data[sectionID].ts} value={data[sectionID].value} />}</View>;
    } */

    getData = async (itemType, page) => {
        let { data } = this.state;

        let txList = [];

        switch (itemType) {
            case this.ITEMTYPE_ALL:
                txList = await getTxList(page, 5);
                break;
            case this.ITEMTYPE_ROZ:
                txList = await getRozTxList(page, 5);
                break;
            case this.ITEMTYPE_ETH:
                txList = await getEthTxList(page, 5);
                break;
            case this.ITEMTYPE_ADDRESSBOOK:
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
            addressBookShow: itemType === this.ITEMTYPE_ADDRESSBOOK ? true : false, //  주소록 on/off
            data: [],
        });
        this.getData(itemType, 1);
    };

    onActiveMini = flag => {
        this.setState({ addressBookShow: flag });
    };

    render() {
        const { page, refreshing, data, itemType, addressBookShow } = this.state;
        const { navigation } = this.props;
        return (
            <KeyboardAvoidingView style={styles.container}>
                {/* <Timeline
                    data={aaa}
                    circleSize={20}
                    circleColor="rgb(45,156,219)"
                    lineColor="rgb(45,156,219)"
                    timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
                    timeStyle={{ textAlign: 'center', backgroundColor: '#ff9797', color: 'white', padding: 5, borderRadius: 13 }}
                    descriptionStyle={{ color: 'gray' }}
                    options={{
                        style: { paddingTop: 5 },
                    }}
                /> */}
                <View style={styles.itemTypeLayout}>
                    <CardView cardElevation={5} cornerRadius={10} style={styles.typeLayout}>
                        <TouchableOpacity
                            style={[styles.alignCenter, itemType === this.ITEMTYPE_ALL && styles.typeSelected]}
                            onPress={() => {
                                this.setType(this.ITEMTYPE_ALL);
                            }}>
                            <Text style={[styles.textStyle, itemType === this.ITEMTYPE_ALL && styles.typeSelectedText]}>전체</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.alignCenter, itemType === this.ITEMTYPE_ROZ && styles.typeSelected]}
                            onPress={() => {
                                this.setType(this.ITEMTYPE_ROZ);
                            }}>
                            <Text style={[styles.textStyle, itemType === this.ITEMTYPE_ROZ && styles.typeSelectedText]}>ROZ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.alignCenter, itemType === this.ITEMTYPE_ETH && styles.typeSelected]}
                            onPress={() => {
                                this.setType(this.ITEMTYPE_ETH);
                            }}>
                            <Text style={[styles.textStyle, itemType === this.ITEMTYPE_ETH && styles.typeSelectedText]}>ETH</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.alignCenter, itemType === this.ITEMTYPE_ADDRESSBOOK && styles.typeSelected]}
                            onPress={() => {
                                this.setType(this.ITEMTYPE_ADDRESSBOOK);
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
                        <FlatList
                            data={data}
                            renderItem={({ item }) => <WalletHistoryComponent navigation={navigation} send={item.send} status={item.status} date={item.date} value={item.value} />}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={this.state}
                            refreshing={refreshing}
                            onRefresh={() => {
                                this.onRefresh();
                            }}
                            onEndReached={() => {
                                this.getData(page);
                            }}
                            onEndReachedThreshold={0.2}
                        />
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
};
