import React, { Component } from 'react';
import { View, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './styles';

export default class QrcodeScan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Scan QR Code',
        };
    }

    _handleAction = e => {
        this.setState({ text: e.data });
    };

    render() {
        const { text } = this.state;
        return (
            <View style={styles.container}>
                <QRCodeScanner onRead={this._handleAction} containerStyle={styles.scannerLayout} />
                <View style={styles.textLayout}>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </View>
        );
    }
}
