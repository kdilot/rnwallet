/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Text, Dimensions, Share, Clipboard, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Button from 'react-native-button';
import PropTypes from 'prop-types';
import styles from './styles';

export default class QrcodeText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: 'Qrcode sample text data',
        };
    }

    onCopy = async () => {
        const { text } = this.state;
        await Clipboard.setString(text);
        await Alert.alert(text);
    };

    onShare = async () => {
        const { text } = this.state;
        Share.share({
            message: text,
        });
        try {
            const result = await Share.share({
                message: text,
            });

            if (result.action === Share.sharedAction) {
                Alert.alert(text);
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };

    render() {
        const { text } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.qrLayout}>
                    <QRCode size={200} value={text} />
                    <Text style={{ ...styles.address, width: Dimensions.get('window').width }}>{text}</Text>
                </View>
                <View style={styles.buttonLayout}>
                    <Button
                        style={styles.buttonTextLayout}
                        styleDisabled={{ color: 'white' }}
                        containerStyle={styles.buttonContainerLayout}
                        disabledContainerStyle={{ backgroundColor: 'pink' }}
                        onPress={() => this.onCopy()}>
                        복사하기
                    </Button>
                    <Button
                        style={styles.buttonTextOutLineLayout}
                        styleDisabled={{ color: 'white' }}
                        containerStyle={styles.buttonContainerOutLineLayout}
                        disabledContainerStyle={{ backgroundColor: 'pink' }}
                        onPress={() => this.onShare()}>
                        공유하기
                    </Button>
                </View>
            </View>
        );
    }
}

QrcodeText.propTypes = {
    text: PropTypes.string,
    onCopy: PropTypes.func,
    onShare: PropTypes.func,
};
