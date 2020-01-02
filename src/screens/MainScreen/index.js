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

class MainScreen extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.walletStore);
        this._loadInitDatas();
    }

    _loadInitDatas() {
        this._getTxList().then(txList => {
            this._setTxListToStore(txList);
        });

        this._getAddressBookMap().then(addressBookMap => {
            this._setAddressBookMapToStore(addressBookMap);
        });
    }

    _getTxList() {
        return etherApi.getTxList(1, 10000, undefined);
    }

    _setTxListToStore(txList) {
        let { txListAction } = this.props;

        if (!Array.isArray(txList) || txList.length === 0) {
            return;
        }

        txListAction.setAllTxList(txList);
    }

    _getAddressBookMap() {
        return addressBookApi.getAddressBookMap(Global.USER_ETH_ADDRESS);
    }

    _setAddressBookMapToStore(addressBookMap) {
        let { addressBookAction } = this.props;

        if (!addressBookMap || addressBookMap === {}) {
            return;
        }

        addressBookAction.setAddressBook(addressBookMap);
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <WalletInfoComponent navigation={navigation} />
                <WalletInfoComponent navigation={navigation} logo={'logo-github'} name={'Ethereum'} coin={'ETH'} value={1372} />
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
