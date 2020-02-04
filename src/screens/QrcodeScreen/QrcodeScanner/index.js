import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import { MAIN_BLUE_COLOR } from 'constants/Color';
import PropTypes from 'prop-types';
import S from './styles';

export default class QrcodeScan extends Component {
    handleAction = e => {
        const { navigation } = this.props;
        navigation.goBack();
        navigation.state.params.setAddress(e.data);
    };

    render() {
        return (
            <SafeAreaView style={S.ContainerView}>
                <QRCodeScanner onRead={this.handleAction} cameraStyle={S.CameraStyle} />
                <BarcodeMask edgeColor={MAIN_BLUE_COLOR} showAnimatedLine={false} />
            </SafeAreaView>
        );
    }
}

QrcodeScan.propTypes = {
    handleAction: PropTypes.func,
};
