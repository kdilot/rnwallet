import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export default class CustomerServiceScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> 고객센터 서비스 준비중 </Text>
            </View>
        );
    }
}