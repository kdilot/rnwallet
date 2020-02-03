/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { SafeAreaView, Image, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as settingActions from 'modules/SettingReducer';
import * as walletActions from 'modules/WalletReducer';
import { Icon } from 'components';
import styles from './styles';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

class IntroScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            walletLoad: false,
            settingLoad: false,
        };
    }
    componentDidMount = async () => {
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
                <Image source={Icon['intro_top']} style={{ width: WIDTH * 0.5, height: (WIDTH * 0.5 * 405) / 288, position: 'absolute', top: 0, left: 0 }} />
                <Image source={Icon['intro_logo']} style={{ width: 170, height: 140, position: 'absolute', top: HEIGHT * 0.35, left: (WIDTH - 170) / 2 }} />
                <Image source={Icon['intro_bottom']} style={{ width: WIDTH * 0.5, height: (WIDTH * 0.5 * 1280) / 748, position: 'absolute', bottom: 0, right: 0 }} />
                <Image source={Icon['intro_content']} style={{ width: WIDTH * 0.71, height: (WIDTH * 0.71 * 1228) / 1028, position: 'absolute', bottom: 0, right: 0 }} />
                <Text style={styles.footerText}>copyright@rozeus, All rights reserved.</Text>
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
