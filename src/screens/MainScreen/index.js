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
            isEthLoad: false,
            isRozLoad: false,
        };

        this.loadInitDatas();
    }

    componentDidMount() {
        const { navigation } = this.props;
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
        this.setState({
            isEthLoad: false,
        });
        let ethBalance = await etherApi.getEthBalance();

        if (!ethBalance) {
            return;
        }
        ethBalance = etherjs.formatUnits(ethBalance, 18);

        this.setState({
            ethBalance: ethBalance,
            isEthLoad: true,
        });
    }

    async getRozBalance() {
        this.setState({
            isRozLoad: false,
        });
        let rozBalance = await etherApi.getRozBalance();

        if (!rozBalance) {
            return 0;
        }

        rozBalance = etherjs.formatUnits(rozBalance, 8);

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
                <WalletInfoComponent navigation={navigation} isLoad={isRozLoad} refresh={() => this.getRozBalance()} value={rozBalance} />
                <WalletInfoComponent navigation={navigation} isLoad={isEthLoad} refresh={() => this.getEthBalance()} logo={'logo-github'} name={'Ethereum'} coin={'ETH'} value={ethBalance} />
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
