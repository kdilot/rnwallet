import React, { Component } from 'react';
import { Text, StatusBar, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as settingActions from 'modules/SettingReducer';
import * as walletActions from 'modules/WalletReducer';
// import AsyncStorage from '@react-native-community/async-storage';
import { rozeusColor } from 'constants/Color';
import styles from './styles';

class IntroScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            walletLoad: false,
            settingLoad: false,
        };
    }
    componentDidMount = async () => {
        // AsyncStorage.removeItem('walletAddress');
        await this.setWallet();
        await this.setSetting();
        await this.goToWalletIntro();
    };

    goToWalletIntro = async () => {
        await setTimeout(() => {
            this.props.navigation.navigate('WalletIntro');
        }, 3000);
    };

    setSetting = () => {
        const { settingAction } = this.props;
        settingAction.setSetting();
    };

    setWallet = () => {
        const { walletAction } = this.props;
        walletAction.setWallet();
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={rozeusColor} />
                <Text style={styles.text}>ROZ</Text>
                <Text style={styles.text}>Wallet</Text>
            </SafeAreaView>
        );
    }
}

export default connect(
    state => ({
        settingStore: state.SettingReducer,
        walletStore: state.WalletReducer,
    }),
    dispatch => ({
        settingAction: bindActionCreators(settingActions, dispatch),
        walletAction: bindActionCreators(walletActions, dispatch),
    }),
)(IntroScreen);
