import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

export default class IntroScreen extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('TabNavigator');
        }, 2000);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>ROZ</Text>
                <Text style={styles.text}>Wallet</Text>
            </View>
        );
    }
}
