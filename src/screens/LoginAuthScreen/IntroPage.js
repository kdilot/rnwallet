import React, { Component } from 'react';
import { Text, View } from 'react-native';
import styles from './IntroPage.styles';

export default class IntroPage extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('FingerPrint');
        }, 2000);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Rozeus</Text>
            </View>
        );
    }
}
