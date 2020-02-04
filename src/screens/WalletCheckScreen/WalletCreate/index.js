/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as walletActions from 'modules/WalletReducer';
import { Text, View, TextInput, Clipboard, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Button, ToastComponent, OverlayComponent } from 'components';
import { fromMnemonic } from 'api/etherjs';
import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';
import PropTypes from 'prop-types';
import S from './styles';

class WalletCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            createDisable: true,
            randomNumber: Math.floor(Math.random() * 12) + 1,
        };
    }

    componentDidMount = () => {
        const { walletAction } = this.props;
        walletAction.setMnemonic();
    };

    onCopy = async () => {
        const { mnemonic } = this.props.walletStore;
        const { lang } = this.props.navigation.getScreenProps('locale');
        await Clipboard.setString(mnemonic);
        await this.toast.showToast(lang.mnemonicCopyMsg);
    };

    onCreate = async () => {
        await this.setState({ createDisable: true, isVisible: true });
        await setTimeout(() => {
            this.onKeyStore();
        }, 100);
    };

    onKeyStore = () => {
        const { lang } = this.props.navigation.getScreenProps('locale');
        const { navigation, walletAction } = this.props;
        const { mnemonic } = this.props.walletStore;
        try {
            const keys = fromMnemonic(mnemonic);
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
            this.setState({ createDisable: false, text: null });
        }
    };

    checkWord = value => {
        const { randomNumber, createDisable } = this.state;
        const { mnemonic } = this.props.walletStore;
        const { lang } = this.props.navigation.getScreenProps('locale');
        if (createDisable) {
            if (mnemonic.split(' ')[randomNumber - 1] === value) {
                this.setState({ createDisable: false });
                this.toast.showToast(lang.pressCreateMsg);
            } else {
                this.toast.showToast(lang.checkAgainMsg);
            }
        }
    };

    render() {
        const { createDisable, randomNumber, isVisible } = this.state;
        const { mnemonic, shuffleMnemonic } = this.props.walletStore;
        const { lang } = this.props.navigation.getScreenProps('locale');
        return (
            <SafeAreaView style={S.ContainerView}>
                <View style={{ flex: 1 }}>
                    <OverlayComponent isVisible={isVisible} text={lang.inProgressMsg} />
                    <View style={S.TextAreaView}>
                        <TextInput style={S.TextInputView} multiline={true} textAlignVertical={'top'} editable={false} value={mnemonic.split(' ').join('   ')} />
                    </View>
                    <View style={S.ConfirmView}>
                        <View style={S.ConfirmTextView}>
                            <Text>{lang.createSaveTextMsg}</Text>
                            <Text>
                                {lang.createConfirmWordMsgOne}
                                {` [ ${randomNumber} ] `}
                                {lang.createConfirmWordMsgTwo}
                            </Text>
                        </View>
                        <View style={S.ConfirmWordView}>
                            <FlatGrid
                                items={shuffleMnemonic}
                                spacing={12}
                                itemDimension={(Dimensions.get('window').width - 50) / 4}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity
                                        activeOpacity={0.9}
                                        style={S.WordView}
                                        onPress={() => {
                                            this.checkWord(item);
                                        }}>
                                        <Text style={{ color: 'white' }}>{item}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                        <View style={S.ButtonView}>
                            <Button name={lang.create} disable={createDisable} color={createDisable ? 'btn_d' : 'btn_o'} onPress={this.onRestore} />
                        </View>
                    </View>
                    <ToastComponent
                        ref={ref => {
                            this.toast = ref;
                        }}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

WalletCreate.proptypes = {
    wallet: PropTypes.object,
    privateKey: PropTypes.string,
    address: PropTypes.string,
    mnemonic: PropTypes.string,
    shuffleMnemonic: PropTypes.array,
    createDisable: PropTypes.bool,
    isVisible: PropTypes.bool,
    randomNumber: PropTypes.number,
    onCopy: PropTypes.func,
    checkWord: PropTypes.func,
    onKeyStore: PropTypes.func,
};

export default connect(
    state => ({
        walletStore: state.WalletReducer,
    }),
    dispatch => ({
        walletAction: bindActionCreators(walletActions, dispatch),
    }),
)(WalletCreate);
