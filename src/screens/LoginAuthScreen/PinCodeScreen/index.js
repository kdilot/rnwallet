/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import PinCode from 'screens/LoginAuthScreen/PinCodeScreen/PinCode';
import AsyncStorage from '@react-native-community/async-storage';

const PinText = ['PIN 등록', 'PIN 입력', 'PIN 재입력'];

export default class PinCodeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            process: 0,
            pinNumber: 0,
        };
    }

    componentDidMount() {
        this.getPIN();
    }

    getPIN = async () => {
        await AsyncStorage.getItem('pin').then(number => {
            number && this.setState({ pinNumber: number, process: 1, pinFlag: true });
        });
    };

    setPIN = async () => {
        const { pinNumber } = this.state;
        await AsyncStorage.setItem('pin', pinNumber);
        await this.setState({ process: 1 });
    };

    authSuccess = () => {
        this.props.navigation.navigate('Home');
    };

    onAction = ({ number }) => {
        const { process, pinNumber } = this.state;
        if (process === 1) {
            pinNumber === number ? this.authSuccess() : Alert.alert('Incorrect'); // 계속 실패시 처리로직;
        } else if (process === 2) {
            if (pinNumber === number) {
                this.setPIN();
            } else {
                this.setState({ process: 0 });
                Alert.alert('password Incorrect');
            }
        } else if (process === 0) {
            this.setState({ pinNumber: number, process: 2 });
        }
    };

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Text>{this.state.pinNumber}</Text>
                <PinCode text={PinText[this.state.process]} action={this.onAction} />
            </View>
        );
    }
}
