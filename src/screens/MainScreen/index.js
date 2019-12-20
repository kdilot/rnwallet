import React, { Component } from 'react';
import { View } from 'react-native';
import WalletInfoComponent from 'components/WalletInfoComponent';
import styles from './styles';

export default class MainScreen extends Component {
    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <WalletInfoComponent navigation={navigation} />
                <WalletInfoComponent navigation={navigation} logo={'logo-github'} name={'Ethereum'} coin={'ETH'} value={1372} />
            </View>
        );
    }
}
