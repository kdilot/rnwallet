/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, SafeAreaView, Image } from 'react-native';
import { Icon } from 'components';
import styles from './styles';

export default class WalletVersionScreen extends Component {
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Image source={Icon['img_comingsoon']} style={{ width: 140, height: 100 }} />
                <Text style={styles.msgTitle}>Service Unavailable</Text>
                <Text style={styles.msgContent}>Sorry for causing all the inconveniences</Text>
            </SafeAreaView>
        );
    }
}
