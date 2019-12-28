import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as addressActions from 'modules/AddressBookReducer';
import * as settingActions from 'modules/SettingReducer';
import * as txListActions from 'modules/TxListReducer';

import * as addressBookApi from 'api/AddressBook/AddressBookApi';
import * as etherApi from 'api/WalletHistory/etherscan-api';

import styles from './styles';
import * as Global from 'constants/Global';

class IntroScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addressBookLoad: false,
            settingLoad: false,
            txListLoad: false,
        };
    }
    componentDidMount = () => {
        this.setAddressBookMap();
        this.setSetting();
        this.goToWalletIntro();
        this.setTxList();
    };

    goToWalletIntro() {
        setTimeout(() => {
            this.props.navigation.navigate('WalletIntro');
        }, 3000);
    }

    setSetting() {
        const { settingAction } = this.props;
        settingAction.setSetting();
    }

    setTxList() {
        const { txListAction } = this.props;
        etherApi.getTxList(1, 10000).then((txList) => {
            if (txList.length === 0) {
                return;
            }

            txListAction.setAllTxList(txList);
            this.setState({ txListLoad: true });
        });
    }

    setAddressBookMap() {
        const { addressAction } = this.props;

        addressBookApi.getAddressBookMap(Global.USER_ETH_ADDRESS).then((addressBookMap) => {
            if (addressBookMap === {}) {
                return;
            }
            addressAction.setAddressBook(addressBookMap);
            this.setState({ addressBookLoad: true });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>ROZ</Text>
                <Text style={styles.text}>Wallet</Text>
            </View>
        );
    }
}

export default connect(
    (state) => ({
        addressBookStore: state.AddressBookReducer,
        settingStore: state.SettingReducer,
        txListStore: state.TxListReducer,
    }),
    (dispatch) => ({
        addressAction: bindActionCreators(addressActions, dispatch),
        settingAction: bindActionCreators(settingActions, dispatch),
        txListAction: bindActionCreators(txListActions, dispatch),
    }),
)(IntroScreen);
