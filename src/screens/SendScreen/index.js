/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as settingActions from 'modules/SettingReducer';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonComponent from 'components/ButtonComponent';
import ToastComponent from 'components/ToastComponent';
import { getGasPrice } from 'api/EtherChain';
import * as etherjs from 'api/etherjs';
import * as Global from 'constants/Global';
import * as etherApi from 'api/WalletHistory/etherscan-api';
// import RNSecureKeyStore, { ACCESSIBLE } from 'react-native-secure-key-store';
import PlaceholderLayout from './PlaceholderLayout';
import { basicColor } from 'constants/Color';
import PropTypes from 'prop-types';
import styles from './styles';

class SendScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            price: 0,
            address: null,
            gas: 1,
            gasMinValue: 0,
            gasMaxValue: 0,
            isSendDisable: true,
            send: props.navigation.state.params.send,
            coin: props.navigation.state.params.coin,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', async payload => {
            if (payload.state.params.sendData) {
                const { address, price, gas } = payload.state.params.sendData;
                await this.setState({ address, price, gas });
                await this.onSend();
            } else {
                if (payload.state.params.address && this.state.send) {
                    this.setState({ address: payload.state.params.address });
                }
                getGasPrice().then(res => {
                    if (res) {
                        this.setState({
                            isSendDisable: false,
                            gas: Number(parseFloat(res.standard).toFixed(1)),
                            gasMinValue: Number(parseFloat(res.safeLow).toFixed(1)),
                            gasMaxValue: Number(parseFloat(res.fastest).toFixed(1)),
                        });
                    }
                });
            }
        });
    }

    componentWillUnmount = () => {
        this.focusListener.remove();
    };

    onSearch = () => {
        this.props.navigation.navigate('QrcodeScanner', { setAddress: this.setAddress });
    };

    setAddress = address => {
        this.setState({ address, send: false });
    };

    getEthBalance = async () => {
        let ethBalance = await etherApi.getEthBalance();
        if (!ethBalance) {
            return;
        }
        return etherjs.formatUnits(ethBalance, 18);
    };

    getRozBalance = async () => {
        let rozBalance = await etherApi.getRozBalance();
        if (!rozBalance) {
            return;
        }
        return etherjs.formatUnits(rozBalance, 8);
    };

    onToast = message => {
        this.toast.showToast(message);
        this.setState({ isSendDisable: false });
    };

    onCheckAuth = () => {
        const { list } = this.props.settingStore;
        const { price, gas, address } = this.state;
        if (list.fingerprint || list.pin) {
            this.props.navigation.navigate(list.fingerprint ? 'FingerPrint' : 'PinCode', { sendData: { price, gas, address } });
        } else {
            this.onSend(price, gas, address);
        }
    };

    onSend = async () => {
        const { coin, price, gas, address } = this.state;
        this.setState({ isSendDisable: true });
        // const to = address;
        const to = '0x656e05B4DcAb9996584FF7a0709fD0C5e22997e3';
        const value = coin === 'ROZ' ? etherjs.parseUnits(String(price), 8) : etherjs.parseEther(String(price));
        const gasPrice = etherjs.parseUnits(String(gas), 'gwei');
        const gasLimit = etherjs.bigNumberify(coin === 'ROZ' ? 2100000 : 21000);
        //  예상 가스값
        const estimateFee = etherjs.parseUnits(String(gas), 'gwei').mul(String(coin === 'ROZ' ? 2100000 : 21000));
        //  예상 발생 ETH 값
        const totalAmount = coin === 'ROZ' ? estimateFee : value.add(estimateFee);

        if (!price || !gas || !address) {
            this.onToast('입력값 확인');
        } else {
            const provider = etherjs.getDefaultProvider(Global.ETH_NETWORK_MODE);
            // const privateKey = await RNSecureKeyStore.get('0x656e05B4DcAb9996584FF7a0709fD0C5e22997e3');
            const privateKey = '271D78A7A394B840EF3D04591E7CCEC4A524113F27F0B45C8BFDBC62F84CDF1B';
            const ethWallet = etherjs.etherWallet(privateKey, provider);
            const ethBalance = await this.getEthBalance();

            if (etherjs.parseEther(String(ethBalance)).lt(totalAmount)) {
                this.onToast('ETH 부족');
            } else if (coin === 'ROZ') {
                const rozBalance = await this.getRozBalance();
                if (etherjs.parseEther(String(rozBalance)).lt(etherjs.parseEther(String(price)))) {
                    this.onToast('ROZ 부족');
                } else {
                    try {
                        const contract = etherjs.contract(Global.SEND_TYPE[Global.ETH_NETWORK_MODE].contractAddress, Global.SEND_TYPE[Global.ETH_NETWORK_MODE].abi, ethWallet);
                        const options = { gasLimit, gasPrice };

                        await contract.transfer(to, value, options).then(tx => {
                            console.log('ROZ 송금이 정상적으로 완료되었습니다. txid=' + tx.hash);
                            this.props.navigation.navigate('Home');
                        });
                    } catch (e) {
                        console.log('ROZ 송금 중 오류가 발생되었습니다. Err=');
                        console.log(e);
                        this.onToast('ROZ 송금오류');
                    }
                }
            } else {
                // ETH
                const nonce = await provider.getTransactionCount(Global.USER_ETH_ADDRESS);
                // #3 .TX 생성
                const transaction = { to, value, gasPrice, gasLimit, nonce, data: '' };
                // #6. 이더리움 서명
                const sign = await ethWallet.sign(transaction);
                // #7. 이더리움 TX 배포
                try {
                    const tx = await provider.sendTransaction(sign);
                    console.log('ETH 송금이 정상적으로 완료되었습니다. txid=' + tx.hash);
                    this.props.navigation.navigate('Home');
                } catch (error) {
                    console.log('ETH 송금 ERROR', `${error.code}\n${error.message}`);
                    this.onToast('ETH 송금오류');
                }
            }
        }
    };

    render() {
        const { price, address, isSendDisable, gas, gasMinValue, gasMaxValue } = this.state;
        const { lang } = this.props.navigation.getScreenProps('locale');
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.headerLayout}>
                    <View style={styles.textareaLayout}>
                        <Text style={styles.textStyle}>{lang.price}</Text>
                        <TextInput style={styles.textInputStyle} placeholder={lang.price} keyboardType="phone-pad" onChangeText={text => this.setState({ price: text })} value={price.toString()} />
                    </View>
                    <View style={styles.textareaLayout}>
                        <Text style={styles.textStyle}>{lang.address}</Text>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TextInput
                                style={[styles.textInputStyle, { flex: 1, paddingRight: 50 }]}
                                placeholder={lang.address}
                                keyboardType="default"
                                onChangeText={text => this.setState({ address: text })}
                                value={address}
                            />
                            <TouchableOpacity
                                style={{ position: 'absolute', top: 6, right: 10 }}
                                onPress={() => {
                                    this.onSearch();
                                }}>
                                <Ionicons name="qrcode-scan" size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.textareaLayout}>
                        <Text style={styles.textStyle}>{lang.fees}</Text>
                        {isSendDisable ? (
                            <PlaceholderLayout />
                        ) : (
                            <>
                                <TextInput
                                    style={styles.textInputStyle}
                                    placeholder={lang.fees}
                                    keyboardType="phone-pad"
                                    onChangeText={text => this.setState({ gas: text > 10 ? 10 : Number(text) })}
                                    value={gas.toString()}
                                />
                                <Slider
                                    value={gas}
                                    onValueChange={data => this.setState({ gas: Number(parseFloat(data).toFixed(1)) })}
                                    thumbTintColor={basicColor}
                                    minimumTrackTintColor={basicColor}
                                    minimumValue={gasMinValue}
                                    maximumValue={gasMaxValue}
                                    step={0.1}
                                />
                                <View style={styles.feeTextLayout}>
                                    <Text style={styles.feeTextStyle}>
                                        {lang.slow}
                                        {`(${gasMinValue})`}
                                    </Text>
                                    <Text style={[styles.feeTextStyle, { textAlign: 'right' }]}>
                                        {lang.fast}
                                        {`(${gasMaxValue})`}
                                    </Text>
                                </View>
                                <Text style={{ textAlign: 'center' }}>Value: {gas}</Text>
                            </>
                        )}
                    </View>
                </View>
                <View style={styles.buttonLayout}>
                    <ButtonComponent
                        disable={isSendDisable}
                        name={lang.send}
                        onPress={() => {
                            this.onCheckAuth();
                        }}
                    />
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

SendScreen.proptypes = {
    value: PropTypes.number,
    gas: PropTypes.number,
    address: PropTypes.string,
    isSendDisable: PropTypes.bool,
    gasMinValue: PropTypes.number,
    gasMaxValue: PropTypes.number,
    onSearch: PropTypes.func,
    onSend: PropTypes.func,
    setAddress: PropTypes.func,
    getEthBalance: PropTypes.func,
    getROZBalance: PropTypes.func,
    onToast: PropTypes.func,
    onCheckAuth: PropTypes.func,
};

export default connect(
    state => ({
        settingStore: state.SettingReducer,
    }),
    dispatch => ({
        settingAction: bindActionCreators(settingActions, dispatch),
    }),
)(SendScreen);
