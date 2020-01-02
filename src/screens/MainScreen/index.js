import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './styles';

import WalletInfoComponent from 'components/WalletInfoComponent';

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
        };
    }

    componentDidMount() {
        this.loadInitDatas();
    }

    loadInitDatas() {
        this.getTxList().then((txList) => {
            this.setTxListToStore(txList);
        });

        this.getAddressBookMap().then((addressBookMap) => {
            this.setAddressBookMapToStore(addressBookMap);
        });

        setTimeout(() => {
            this.getEthBalance().then((ethBalance) => {
                this.setEthBalance(ethBalance);
            });

            this.getRozBalance().then((rozBalance) => {
                this.setRozBalance(rozBalance);
            });
        }, 3000);
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
        });
    }

    async getRozBalance() {
        let rozBalance = await etherApi.getRozBalance();
        return etherjs.formatUnits(rozBalance, 8);
    }

    setRozBalance(rozBalance) {
        this.setState({
            rozBalance: rozBalance,
        });
    }

    render() {
        const { navigation } = this.props;
        const { ethBalance, rozBalance } = this.state;
        return (
            <View style={styles.container}>
                <WalletInfoComponent navigation={navigation} value={rozBalance} />
                <WalletInfoComponent navigation={navigation} logo={'logo-github'} name={'Ethereum'} coin={'ETH'} value={ethBalance} />
            </View>
        );
    }
}

export default connect(
    (state) => ({
        walletStore: state.WalletReducer,
    }),
    (dispatch) => ({
        txListAction: bindActionCreators(txListActions, dispatch),
        addressBookAction: bindActionCreators(addressBookActions, dispatch),
        walletAction: bindActionCreators(walletActions, dispatch),
    }),
)(MainScreen);
