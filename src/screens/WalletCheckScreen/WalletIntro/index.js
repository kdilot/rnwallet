/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as walletActions from 'modules/WalletReducer';
import { View, StatusBar, SafeAreaView, Image } from 'react-native';
import { Button } from 'components';
import { USER_ETH_ADDRESS } from 'constants/Global';
import { Icon } from 'components';
import styles from './styles';
import PropTypes from 'prop-types';

class WalletCheckScreen extends Component {
    componentDidMount() {
        const { navigation } = this.props;
        if (USER_ETH_ADDRESS) {
            navigation.navigate('Home');
        }
    }

    onCreate = () => {
        const { navigation } = this.props;
        navigation.navigate('WalletCreate');
    };

    onRestore = () => {
        const { navigation } = this.props;
        navigation.navigate('WalletRestore');
    };

    render() {
        const { lang } = this.props.navigation.getScreenProps('locale');
        return (
            <SafeAreaView style={styles.container}>
                <Image source={Icon['wallet_intro']} style={{ width: '100%', height: '58%' }} />
                <Image source={Icon['wallet_logo']} style={{ width: '61%', height: '11%', position: 'absolute', top: '21%', left: '19.4%' }} />
                <StatusBar backgroundColor={'#2e3045'} />
                <View style={styles.buttonLayout}>
                    <View style={styles.buttonStyle}>
                        <Button name={lang.restore} color={'btn_sm_b'} onPress={this.onRestore} />
                    </View>
                    <View style={styles.buttonStyle}>
                        <Button name={lang.create} color={'btn_sm_o'} onPress={this.onCreate} />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

WalletCheckScreen.propTypes = {
    onCreate: PropTypes.func,
};

export default connect(
    state => ({
        walletStore: state.WalletReducer,
    }),
    dispatch => ({
        walletAction: bindActionCreators(walletActions, dispatch),
    }),
)(WalletCheckScreen);
