/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as walletActions from 'modules/WalletReducer';
import { View, StatusBar, SafeAreaView, Image, Dimensions } from 'react-native';
import { Button } from 'components';
import { USER_ETH_ADDRESS } from 'constants/Global';
import { Icon } from 'components';
import PropTypes from 'prop-types';
import S from './styles';

const WIDTH = Dimensions.get('window').width;

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
            <SafeAreaView style={S.ContainerView}>
                <Image source={Icon['wallet_intro']} style={{ width: WIDTH, height: (WIDTH * 557) / 540 }} />
                <Image source={Icon['wallet_logo']} style={{ width: WIDTH * 0.61, height: (WIDTH * 0.61 * 120) / 330, position: 'absolute', top: '21%', left: '19.4%' }} />
                <StatusBar backgroundColor={'#2e3045'} />
                <View style={S.ButtonView}>
                    <View style={S.ButtonStyle}>
                        <Button name={lang.restore} color={'btn_sm_b'} onPress={this.onRestore} />
                    </View>
                    <View style={S.ButtonStyle}>
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
