import React, { Component } from 'react';
import { View, Text, Dimensions, Share, Clipboard, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import styles from './styles';

export default class Qrcode extends Component {
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
                    <Button title="복사하기" onPress={() => this.onCopy()} />
                    <Button title="공유하기" onPress={() => this.onShare()} />
                </View>
            </View>
        );
    }
}
