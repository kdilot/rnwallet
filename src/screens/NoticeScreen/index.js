import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export default class NoticeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> This is Notice Page </Text>
            </View>
        );
    }
}
