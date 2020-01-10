import React, { Component } from 'react';
import { View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import PropTypes from 'prop-types';
import styles from './styles';

export default class QrcodeScan extends Component {
    handleAction = e => {
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.setAddress(e.data);
    };

    render() {
        return (
            <View style={styles.container}>
                <QRCodeScanner onRead={this.handleAction} cameraStyle={styles.cameraStyle} />
                <BarcodeMask edgeColor={'#62B1F6'} showAnimatedLine={false} />
            </View>
        );
    }
}

QrcodeScan.propTypes = {
    handleAction: PropTypes.func,
};
