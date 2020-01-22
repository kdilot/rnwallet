/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from 'store';
import { MainNavigator } from 'navigators';
import { StatusBar, Platform } from 'react-native';
import { View } from 'react-native';
import { basicColor } from 'constants/Color';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <View
                    style={{
                        backgroundColor: basicColor,
                        height: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
                    }}>
                    <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content" />
                </View>
                <MainNavigator />
            </Provider>
        );
    }
}
