import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './styles';

import WalletInfoComponent from 'components/WalletInfoComponent';

import * as txListActions from 'modules/TxListReducer';
import * as addressBookActions from 'modules/AddressBookReducer';
import * as walletActions from 'modules/WalletReducer';
import * as etherjs from 'api/etherjs';
import * as addressBookApi from 'api/AddressBook/AddressBookApi';
import * as Global from 'constants/Global';
import { AsyncStorage } from '@react-native-community/async-storage';

class MainScreen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            ethBalance: 0,
            rozBalance: 0,
            isEthLoad: false,
            isRozLoad: false,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.loadInitDatas();
        this.focusListener = navigation.addListener('didFocus', async payload => {
            this.getEthBalance();
            this.getRozBalance();
        });
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

    render() {
        const { navigation } = this.props;
        const { ethBalance, rozBalance, isEthLoad, isRozLoad } = this.state;
        return (
            <View style={styles.container}>
                <WalletInfoComponent navigation={navigation} isLoad={isRozLoad} refresh={() => this.getRozBalance()} icon={'roz'} value={rozBalance} />
                <WalletInfoComponent navigation={navigation} isLoad={isEthLoad} refresh={() => this.getEthBalance()} icon={'eth'} name={'Ethereum'} coin={'ETH'} value={ethBalance} />
            </View>
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
