import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as walletActions from 'modules/WalletReducer';
import { View, Text, Dimensions, Share, Clipboard } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ButtonComponent from 'components/ButtonComponent';
import ToastComponent from 'components/ToastComponent';
import PropTypes from 'prop-types';
import styles from './styles';

class QrcodeText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: props.walletStore.wallets.address,
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
            <View style={styles.container}>
                <ToastComponent
                    ref={ref => {
                        this.toast = ref;
                    }}
                />
                <View style={styles.qrLayout}>
                    <QRCode size={200} value={text} />
                    <Text style={{ ...styles.address, width: Dimensions.get('window').width }}>{text}</Text>
                </View>
                <View style={styles.buttonLayout}>
                    <ButtonComponent style={styles.buttonStyle} name={lang.copy} outline={true} onPress={this.onCopy} />
                    <ButtonComponent style={styles.buttonStyle} name={lang.share} onPress={this.onShare} />
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

export default connect(
    state => ({
        walletStore: state.WalletReducer,
    }),
    dispatch => ({
        walletAction: bindActionCreators(walletActions, dispatch),
    }),
)(QrcodeText);
