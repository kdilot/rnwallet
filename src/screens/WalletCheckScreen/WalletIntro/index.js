/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import ButtonComp from 'components/ButtonComp';
import styles from './styles';

export default class WalletCheckScreen extends Component {
    onCreate = () => {
        const { navigation } = this.props;
        navigation.navigate('WalletCreate');
    };

    onRestore = () => {
        const { navigation } = this.props;
        navigation.navigate('WalletRestore');
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoLayout}>
                    <Text style={styles.logoTextLayout}>ROZ</Text>
                    <Text style={styles.logoSubTextLayout}>Wallet</Text>
                </View>
                <View style={styles.buttonLayout}>
                    <ButtonComp name={'생성하기'} color={'#d82027'} style={{ marginBottom: 10 }} onPress={this.onCreate} />
                    <ButtonComp name={'복구하기'} color={'#d82027'} outline={true} onPress={this.onRestore} />
                </View>
            </View>
        );
    }
}

WalletCheckScreen.propTypes = {
    onCreate: PropTypes.func,
};
