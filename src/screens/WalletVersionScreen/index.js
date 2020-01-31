import React, { Component } from 'react';
import { Text, SafeAreaView } from 'react-native';
import styles from './styles';

export default class WalletVersionScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text> 지갑정보 서비스 준비중 </Text>
            </SafeAreaView>
        );
    }
}
