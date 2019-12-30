import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as settingActions from 'modules/SettingReducer';

import * as settingApi from 'api/Setting';

import styles from './styles';

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
        this.setSetting();
        this.goToWalletIntro();
    };

    goToWalletIntro() {
        setTimeout(() => {
            this.props.navigation.navigate('WalletIntro');
        }, 3000);
    }

    setSetting() {
        const { settingAction } = this.props;

        settingApi.getSettingApi().then((res) => {
            settingAction.setSetting(res);
            this.setState({ settingLoad: true });
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
        settingStore: state.SettingReducer,
    }),
    (dispatch) => ({
        settingAction: bindActionCreators(settingActions, dispatch),
    }),
)(IntroScreen);
