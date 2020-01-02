import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './styles';

import WalletInfoComponent from 'components/WalletInfoComponent';
import PlaceholderLayout from './PlaceholderLayout';

import * as txListActions from 'modules/TxListReducer';
import * as addressBookActions from 'modules/AddressBookReducer';
import * as walletActions from 'modules/WalletReducer';
import * as etherApi from 'api/WalletHistory/etherscan-api';
import * as addressBookApi from 'api/AddressBook/AddressBookApi';
import * as Global from 'constants/Global';
import * as etherjs from 'api/etherjs';

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

        this.focusListener = navigation.addListener('didFocus', async payload => {
            this.loadInitDatas();
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

        this.getEthBalance().then(ethBalance => {
            this.setEthBalance(ethBalance);
        });

        this.getRozBalance().then(rozBalance => {
            this.setRozBalance(rozBalance);
        });
    }

    getTxList() {
        return etherApi.getTxList(1, 10000);
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
        let ethBalance = await etherApi.getEthBalance();
        return etherjs.formatUnits(ethBalance, 18);
    }

    setEthBalance(ethBalance) {
        this.setState({
            ethBalance: ethBalance,
            isEthLoad: true,
        });
    }

    async getRozBalance() {
        let rozBalance = await etherApi.getRozBalance();
        return etherjs.formatUnits(rozBalance, 8);
    }

    setRozBalance(rozBalance) {
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
                {isEthLoad ? <WalletInfoComponent navigation={navigation} value={rozBalance} /> : <PlaceholderLayout />}
                {isRozLoad ? <WalletInfoComponent navigation={navigation} logo={'logo-github'} name={'Ethereum'} coin={'ETH'} value={ethBalance} /> : <PlaceholderLayout />}
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
