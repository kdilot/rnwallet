/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as walletActions from 'modules/WalletReducer';
import { Text, View, TextInput, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { ButtonComponent, ToastComponent, OverlayComponent } from 'components';
import { fromMnemonic } from 'api/etherjs';
import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';
import AsyncStorage from '@react-native-community/async-storage';
import { USER_ETH_ADDRESS } from 'constants/Global';
import PropTypes from 'prop-types';
import styles from './styles';

class WalletRestore extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: null,
            isVisible: false,
            restoreDisable: true,
        };
    }

    onRestore = async () => {
        //  Token 생성 로직 추가
        await this.setState({ restoreDisable: true, isVisible: true });
        await setTimeout(() => {
            this.onKeyStore();
        }, 100);
    };

    onKeyStore = async () => {
        const { navigation, walletAction } = this.props;
        const { lang } = navigation.getScreenProps('locale');
        const { text } = this.state;
        const test = navigation.state;
        if (typeof test.params !== 'undefined') {
            try {
                const keys = fromMnemonic(text);
                const address = keys.address;
                if (address === USER_ETH_ADDRESS) {
                    await AsyncStorage.removeItem('pincode');
                    await navigation.navigate('PinCode');
                } else {
                    this.toast.showToast(lang.IncorrectMnemonicMsg);
                }
            } catch (e) {
                this.toast.showToast(lang.mnemonicMsg);
            }
            this.setState({ restoreDisable: false, text: null, isVisible: false });
        } else {
            try {
                const keys = fromMnemonic(text);
                const address = keys.address;
                const privateKey = keys.privateKey;
                if (address) {
                    RNSecureKeyStore.set(address, privateKey, { accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY }).then(async res => {
                        await walletAction.setWalletAddress({ walletAddress: address, async: true });
                        await this.setState({ isVisible: false });
                        await navigation.navigate('Home');
                    });
                }
            } catch (e) {
                this.toast.showToast(lang.mnemonicMsg);
                this.setState({ restoreDisable: false, isVisible: false, text: null });
            }
        }
    };

    onChangeText = text => {
        this.setState({ text, restoreDisable: text ? false : true });
    };

    render() {
        const { text, restoreDisable, isVisible } = this.state;
        const { lang } = this.props.navigation.getScreenProps('locale');
        return (
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView style={{ flex: 1, padding: 20 }}>
                    <OverlayComponent isVisible={isVisible} text={lang.inProgressMsg} />
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
            </SafeAreaView>
        );
    }
}

WalletRestore.propTypes = {
    text: PropTypes.string,
    restoreDisable: PropTypes.bool,
    isVisible: PropTypes.bool,
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
