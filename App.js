import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import store from 'store';
// import Locale from 'components/Locale';
import IntroScreen from 'screens/IntroScreen';
import TabNavigatorScreen from 'navigators/TabNavigator';
import WalletIntroScreen from 'screens/WalletCheckScreen/WalletIntro';
import WalletCreateScreen from 'screens/WalletCheckScreen/WalletCreate';
import WalletRestoreScreen from 'screens/WalletCheckScreen/WalletRestore';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Navigation />
            </Provider>
        );
    }
}

const Navigation = createAppContainer(
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
