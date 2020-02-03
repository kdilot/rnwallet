/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from 'react';
import { View, Text, Dimensions, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { WalletInfoComponent, IconComponent, Icon } from 'components';
import AsyncStorage from '@react-native-community/async-storage';
import Carousel from 'react-native-snap-carousel';
import { animationAction } from './animation';
import * as txListActions from 'modules/TxListReducer';
import * as addressBookActions from 'modules/AddressBookReducer';
import * as walletActions from 'modules/WalletReducer';
import * as etherjs from 'api/etherjs';
import * as addressBookApi from 'api/AddressBook/AddressBookApi';
import * as Global from 'constants/Global';
import styles from './styles';

const CARD = ['roz', 'eth'];
const WIDTH = Dimensions.get('window').width;

class MainScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            ethBalance: 0,
            rozBalance: 0,
            isEthLoad: false,
            isRozLoad: false,
            isRoz: true,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.loadInitDatas();
        this.focusListener = navigation.addListener('didFocus', async payload => {
            this.getEthBalance();
            this.getRozBalance();
        });
        animationAction();
    }
    componentWillUnmount() {
        this.focusListener.remove();
    }

    loadInitDatas() {
        this.setState({
            isEthLoad: false,
            isRozLoad: false,
        });
        this.getTxList().then(txList => {
            this.setTxListToStore(txList);
        });

        this.getAddressBookMap().then(addressBookMap => {
            this.setAddressBookMapToStore(addressBookMap);
        });

        this.getEthBalance();
        this.getRozBalance();
        this.getPendingTxList();
    }

    async getPendingTxList() {
        const { txListAction } = this.props;

        // 거래내역 Pending List
        const pendingList = await AsyncStorage.getItem('pendingTxList');
        if (pendingList) {
            await txListAction.setPendingTxList(JSON.parse(pendingList));
        }
    }

    getTxList() {
        return etherjs.getTxList(1, 10000);
    }

    setTxListToStore(txList) {
        let { txListAction } = this.props;

        if (!Array.isArray(txList) || txList.length === 0) {
            return;
        }

        txListAction.setAllTxList(txList);
    }

    getAddressBookMap() {
        return addressBookApi.getAddressBookMap(Global.USER_ETH_ADDRESS);
    }

    setAddressBookMapToStore(addressBookMap) {
        let { addressBookAction } = this.props;

        if (!addressBookMap || addressBookMap === {}) {
            return;
        }

        addressBookAction.setAddressBook(addressBookMap);
    }

    async getEthBalance() {
        this.setState({
            isEthLoad: false,
        });

        let ethBalance = await etherjs.getEthBalance();

        this.setState({
            ethBalance: ethBalance,
            isEthLoad: true,
        });
    }

    async getRozBalance() {
        this.setState({
            isRozLoad: false,
        });
        let rozBalance = await etherjs.getRozBalance();

        this.setState({
            rozBalance: rozBalance,
            isRozLoad: true,
        });
    }

    onSelect = () => {
        const { isRoz } = this.state;
        if (isRoz) {
            this.carousel.snapToNext();
            this.setState({ isRoz: false });
        } else {
            this.carousel.snapToPrev();
            this.setState({ isRoz: true });
        }
    };

    render() {
        const { navigation } = this.props;
        const { ethBalance, rozBalance, isEthLoad, isRozLoad, isRoz } = this.state;

        return (
            <SafeAreaView style={styles.container}>
                <Image source={Icon['home_bg']} style={{ width: WIDTH * 0.65, height: (WIDTH * 0.65 * 548) / 351, position: 'absolute', top: 0, left: 0 }} />
                <View style={styles.HeaderView}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.openDrawer();
                        }}>
                        <IconComponent name={'btn_menu'} size={40} />
                    </TouchableOpacity>
                </View>
                <View style={styles.HeaderTitleView}>
                    <Text style={styles.HeaderTitleText}>Wallets</Text>
                </View>
                <View style={styles.ContentView}>
                    <TouchableOpacity style={styles.CoinTypeView} disabled={isRoz && true} onPress={this.onSelect}>
                        <Text style={[styles.CoinTypeText, isRoz && styles.CoinSelected(isRoz)]}>ROZ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CoinTypeView} disabled={!isRoz && true} onPress={this.onSelect}>
                        <Text style={[styles.CoinTypeText, !isRoz && styles.CoinSelected(isRoz)]}>ETH</Text>
                    </TouchableOpacity>
                </View>
                <Carousel
                    ref={c => {
                        this.carousel = c;
                    }}
                    inactiveSlideOpacity={1}
                    inactiveSlideScale={1}
                    slideStyle={styles.SliderView}
                    scrollEnabled={false}
                    data={CARD}
                    renderItem={(i, index) => (
                        <WalletInfoComponent
                            key={index}
                            navigation={navigation}
                            isLoad={i.item === 'roz' ? isRozLoad : isEthLoad}
                            refresh={() => (i.item === 'roz' ? this.getRozBalance() : this.getEthBalance())}
                            icon={i.item}
                            name={i.item === 'roz' ? 'Rozeus' : 'Ethereum'}
                            coin={i.item.toUpperCase()}
                            value={i.item === 'roz' ? rozBalance : ethBalance}
                        />
                    )}
                    sliderWidth={WIDTH}
                    itemWidth={WIDTH * 0.83}
                />
            </SafeAreaView>
        );
    }
}

export default connect(
    state => ({
        walletStore: state.WalletReducer,
    }),
    dispatch => ({
        txListAction: bindActionCreators(txListActions, dispatch),
        addressBookAction: bindActionCreators(addressBookActions, dispatch),
        walletAction: bindActionCreators(walletActions, dispatch),
    }),
)(MainScreen);
