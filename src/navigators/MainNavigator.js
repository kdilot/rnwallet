import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as localeActions from 'modules/LocaleReducer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import TabNavigator from './TabNavigator';
import { IntroScreen, WalletIntroScreen, WalletCreateScreen, WalletRestoreScreen } from 'screens';

class MainNavigator extends Component {
    componentDidMount() {
        const { LocaleAction } = this.props;
        LocaleAction.getLocale(); //  언어정보
    }

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
                screen: TabNavigator,
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
