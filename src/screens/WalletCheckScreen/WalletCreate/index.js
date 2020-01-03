import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as walletActions from 'modules/WalletReducer';
import { Text, View, TextInput, Clipboard, Dimensions } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import ButtonComponent from 'components/ButtonComponent';
import ToastComponent from 'components/ToastComponent';
import { ethers } from 'ethers';
import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';
import PropTypes from 'prop-types';
import styles from './styles';

class WalletCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
        await this.setState({ createDisable: true });
        await setTimeout(() => {
            this.onKeyStore();
        }, 100);
    };

    onKeyStore = () => {
        const { lang } = this.props.navigation.getScreenProps('locale');
        const { navigation, walletAction } = this.props;
        const { mnemonic } = this.props.walletStore;
        try {
            const keys = ethers.Wallet.fromMnemonic(mnemonic);
            const address = keys.address;
            const privateKey = keys.privateKey;
            if (address) {
                const wallet = {
                    //  임시
                    name: '이더리움',
                    coinType: 'ETH',
                    symbol: 'ETH',
                    address: address,
                };
                RNSecureKeyStore.set(address, privateKey, { accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY }).then(async res => {
                    await walletAction.setWalletAddress({ wallet, async: true });
                    await navigation.navigate('Home');
                });
            }
        } catch (e) {
            this.toast.showToast(lang.mnemonicMsg);
            this.setState({ restoreDisable: false, text: null });
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
        const { createDisable, randomNumber } = this.state;
        const { mnemonic, shuffleMnemonic } = this.props.walletStore;
        const { lang } = this.props.navigation.getScreenProps('locale');
        return (
            <View style={styles.container}>
                <View style={styles.textareaLayout}>
                    <TextInput style={styles.textarea} multiline={true} textAlignVertical={'top'} editable={false} value={mnemonic.split(' ').join('   ')} />
                </View>
                <View style={styles.buttonLayout}>
                    <ButtonComponent name={lang.copy} outline={true} onPress={this.onCopy} />
                </View>
                <View style={styles.confirmLayout}>
                    <View style={styles.confirmTextLayout}>
                        <Text>{lang.createSaveTextMsg}</Text>
                        <Text>
                            {lang.createConfirmWordMsgOne}
                            {` [ ${randomNumber} ] `}
                            {lang.createConfirmWordMsgTwo}
                        </Text>
                    </View>
                    <View style={styles.confirmGridLayout}>
                        <FlatGrid
                            items={shuffleMnemonic}
                            spacing={12}
                            itemDimension={(Dimensions.get('window').width - 50) / 4}
                            renderItem={({ item, index }) => (
                                <ButtonComponent
                                    name={item}
                                    onPress={() => {
                                        this.checkWord(item);
                                    }}
                                />
                            )}
                        />
                    </View>
                </View>
                <View style={styles.buttonLayout}>
                    <ButtonComponent name={lang.create} disable={createDisable} onPress={this.onCreate} />
                </View>
                <ToastComponent
                    ref={ref => {
                        this.toast = ref;
                    }}
                />
            </View>
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
