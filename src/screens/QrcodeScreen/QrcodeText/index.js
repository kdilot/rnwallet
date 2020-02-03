import React, { Component } from 'react';
import { View, Text, Dimensions, Share, Clipboard, SafeAreaView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { Button, ToastComponent } from 'components';
import { USER_ETH_ADDRESS } from 'constants/Global';
import PropTypes from 'prop-types';
import styles from './styles';

export default class QrcodeText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: USER_ETH_ADDRESS,
        };
    }

    onCopy = async () => {
        const { text } = this.state;
        await Clipboard.setString(text);
        this.toast.showToast(text);
    };

    onShare = async () => {
        const { text } = this.state;
        try {
            const result = await Share.share({
                message: text,
            });
            if (result.action === Share.sharedAction) {
                this.toast.showToast(text);
            }
        } catch (error) {
            this.toast.showToast(error.message);
        }
    };

    render() {
        const { text } = this.state;
        const { lang } = this.props.navigation.getScreenProps('locale');
        return (
            <SafeAreaView style={styles.container}>
                <ToastComponent
                    ref={ref => {
                        this.toast = ref;
                    }}
                />
                <View style={styles.qrLayout}>
                    <QRCode size={180} value={text} />
                    <Text style={{ ...styles.address, width: Dimensions.get('window').width }}>{text}</Text>
                </View>
                <View style={styles.buttonLayout}>
                    <View style={styles.buttonStyle}>
                        <Button name={lang.copy} color={'btn_sm_b'} onPress={this.onCopy} />
                    </View>
                    <View style={styles.buttonStyle}>
                        <Button name={lang.share} color={'btn_sm_o'} onPress={this.onShare} />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

QrcodeText.propTypes = {
    text: PropTypes.string,
    onCopy: PropTypes.func,
    onShare: PropTypes.func,
};
