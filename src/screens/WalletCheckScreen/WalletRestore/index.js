import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as walletActions from 'modules/WalletReducer';
import { Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import ButtonComponent from 'components/ButtonComponent';
import ToastComponent from 'components/ToastComponent';
import { fromMnemonic } from 'api/etherjs';
import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';
import PropTypes from 'prop-types';
import styles from './styles';

class WalletRestore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: null,
            restoreDisable: false,
        };
    }

    onRestore = async () => {
        //  Token 생성 로직 추가
        await this.setState({ restoreDisable: true });
        await setTimeout(() => {
            this.onKeyStore();
        }, 100);
    };

    onKeyStore = () => {
        const { lang } = this.props.navigation.getScreenProps('locale');
        const { navigation, walletAction } = this.props;
        const { text } = this.state;
        try {
            const keys = fromMnemonic(text);
            const address = keys.address;
            const privateKey = keys.privateKey;
            if (address) {
                RNSecureKeyStore.set(address, privateKey, { accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY }).then(async res => {
                    await walletAction.setWalletAddress({ walletAddress: address, async: true });
                    await navigation.navigate('Home');
                });
            }
        } catch (e) {
            this.toast.showToast(lang.mnemonicMsg);
            this.setState({ restoreDisable: false, text: null });
        }
    };

    onChangeText = text => {
        this.setState({ text, restoreDisable: text ? false : true });
    };

    render() {
        const { text, restoreDisable } = this.state;
        const { lang } = this.props.navigation.getScreenProps('locale');
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.textareaLayout}>
                    <Text style={styles.textStyle}>{lang.restoreInputMsg}</Text>
                    <TextInput style={styles.textareaStyle} multiline={true} textAlignVertical={'top'} value={text} onChangeText={this.onChangeText} />
                </View>
                <View style={styles.buttonLayout}>
                    <ButtonComponent name={lang.restore} disable={restoreDisable} onPress={this.onRestore} />
                </View>
                <ToastComponent
                    ref={ref => {
                        this.toast = ref;
                    }}
                />
            </KeyboardAvoidingView>
        );
    }
}

WalletRestore.propTypes = {
    text: PropTypes.string,
    restoreDisable: PropTypes.bool,
    onChangeText: PropTypes.func,
    onRestore: PropTypes.func,
    onKeyStore: PropTypes.func,
};

export default connect(
    state => ({
        walletStore: state.WalletReducer,
    }),
    dispatch => ({
        walletAction: bindActionCreators(walletActions, dispatch),
    }),
)(WalletRestore);
