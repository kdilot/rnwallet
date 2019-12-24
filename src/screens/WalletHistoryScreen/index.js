// /* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import WalletHistoryComponent from 'components/WalletHistoryComponent';
import AddressBookMiniComponent from 'components/AddressBookMiniComponent';
import CardView from 'react-native-cardview';
import PropTypes from 'prop-types';
import styles from './styles';
import sampleData from './sampleData.json';

export default class WalletHistoryScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            data: sampleData,
            extraData: [],
            itemType: 0,
            refreshing: false,
            addressBookShow: false,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', payload => {
            if (payload.state.params) {
                this.setState({ itemType: payload.state.params.itemType });
                this.getAddressData(payload.state.params.address);
            }
        });
    }

    onRefresh = () => {
        this.setState({
            refreshing: true,
            page: 1,
        });
        this.getData();
    };

    getData = page => {
        const { data } = this.state;
        if (!page) {
            // 데이터 초기화
            this.setState({
                data: sampleData,
                refreshing: false,
                page: 1,
            });
        } else {
            // 데이터 추가
            this.setState({
                data: data.concat(sampleData),
                refreshing: false,
                page: page + 1,
            });
        }
    };

    getAddressData = address => {
        console.log('ADDRESS DATA ', address);
        this.setState({ addressBookShow: false });
    };

    setType = type => {
        this.setState({
            itemType: type,
            addressBookShow: type === 3 ? true : false, //  주소록 on/off
        });
        if (type !== 3) {
            //  주소록은 선택 후 데이터 가져오기
            this.getData(0);
        }
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
                            style={[styles.alignCenter, itemType === 0 && styles.typeSelected]}
                            onPress={() => {
                                this.setType(0);
                            }}>
                            <Text style={[styles.textStyle, itemType === 0 && styles.typeSelectedText]}>전체</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.alignCenter, itemType === 1 && styles.typeSelected]}
                            onPress={() => {
                                this.setType(1);
                            }}>
                            <Text style={[styles.textStyle, itemType === 1 && styles.typeSelectedText]}>ROZ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.alignCenter, itemType === 2 && styles.typeSelected]}
                            onPress={() => {
                                this.setType(2);
                            }}>
                            <Text style={[styles.textStyle, itemType === 2 && styles.typeSelectedText]}>ETH</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.alignCenter, itemType === 3 && styles.typeSelected]}
                            onPress={() => {
                                this.setType(3);
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
