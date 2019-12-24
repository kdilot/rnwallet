import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as localeActions from 'modules/LocaleReducer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import IntroScreen from 'screens/IntroScreen';
import TabNavigatorScreen from 'navigators/TabNavigator';
import WalletIntroScreen from 'screens/WalletCheckScreen/WalletIntro';
import WalletCreateScreen from 'screens/WalletCheckScreen/WalletCreate';
import WalletRestoreScreen from 'screens/WalletCheckScreen/WalletRestore';

class MainNavigator extends Component {
    render() {
        return <Screens screenProps={{ lang: this.props.locale.lang }} />;
    }
}

const Screens = createAppContainer(
    createSwitchNavigator(
        {
            Intro: {
                screen: IntroScreen,
            },
            TabNavigator: {
                screen: TabNavigatorScreen,
            },
            WalletIntro: {
                screen: WalletIntroScreen,
            },
            WalletCreate: {
                screen: WalletCreateScreen,
            },
            WalletRestore: {
                screen: WalletRestoreScreen,
            },
        },
        { defaultNavigationOptions: { header: null } },
    ),
);

export default connect(
    state => ({
        locale: state.LocaleReducer,
    }),
    dispatch => ({
        LocaleAction: bindActionCreators(localeActions, dispatch),
    }),
)(MainNavigator);
