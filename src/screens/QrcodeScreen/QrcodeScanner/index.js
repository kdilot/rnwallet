import React, { Component } from 'react';
import { View, Text } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import PropTypes from 'prop-types';
import styles from './styles';

export default class QrcodeScan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Scan QR Code',
        };
    }

    handleAction = e => {
        this.setState({ text: e.data });
    };

    render() {
        const { text } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.scannerLayout}>
                    <QRCodeScanner onRead={this.handleAction} />
                    <BarcodeMask edgeColor={'#62B1F6'} showAnimatedLine={false} />
                </View>
                <View style={styles.textLayout}>
                    <Text style={styles.text}>{text}</Text>
                </View>
            </View>
        );
    }
}

QrcodeScan.propTypes = {
    text: PropTypes.string,
    handleAction: PropTypes.func,
};
