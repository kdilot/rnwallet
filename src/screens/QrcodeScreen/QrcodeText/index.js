import React, { Component } from 'react';
import { View, Text, Dimensions, Share, Clipboard, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
// import Button from 'react-native-button';
import ButtonComponent from 'components/ButtonComponent';
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
                    <ButtonComponent style={styles.buttonStyle} name={'복사하기'} outline={true} onPress={this.onCopy} />
                    <ButtonComponent style={styles.buttonStyle} name={'공유하기'} onPress={this.onShare} />
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
