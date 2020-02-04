/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as settingActions from 'modules/SettingReducer';
import * as txListActions from 'modules/TxListReducer';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import { ToastComponent, OverlayComponent, IconComponent, Button } from 'components';
import { getGasPrice } from 'api/EtherChain';
import * as etherjs from 'api/etherjs';
import RNSecureKeyStore from 'react-native-secure-key-store';
import { USER_ETH_ADDRESS } from 'constants/Global';
import PlaceholderLayout from './PlaceholderLayout';
import { MAIN_BLUE_COLOR } from 'constants/Color';
import PropTypes from 'prop-types';
import S from './styles';

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
            isVisible: false,
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

    onToast = message => {
        this.toast.showToast(message);
        this.setState({ isSendDisable: false });
    };

    onCheckAuth = () => {
        const { lang } = this.props.navigation.getScreenProps('locale');
        const { list } = this.props.settingStore;
        const { price, gas, address } = this.state;

        if (!price || !gas || !address) {
            this.onToast(lang.inputErrorMsg);
            return;
        }

        const decimal = price.split('.')[1];
        if (decimal !== undefined) {
            if (decimal.length > 8) {
                this.onToast('소수점 자릿수를 확인하세요.');
                return;
            }
        }

        if (list.fingerprint || list.pin) {
            this.props.navigation.navigate(list.fingerprint ? 'FingerPrint' : 'PinCode', { sendData: { price, gas, address } });
        } else {
            this.onSend(price, gas, address);
        }
    };

    onSend = async () => {
        const { lang } = this.props.navigation.getScreenProps('locale');
        const { coin, price, gas, address } = this.state;
        const { navigation } = this.props;
        this.setState({ isSendDisable: true, isVisible: true });

        if (!price || !gas || !address) {
            this.setState({ isVisible: false });
            this.onToast(lang.inputErrorMsg);
            return;
        }

        if (!(await etherjs.isEnoughEthFee(gas))) {
            this.setState({ isVisible: false });
            this.onToast(`${lang.notEnoughMsg} [ETH Fee]`);
            return;
        }

        let privateKey = await RNSecureKeyStore.get(USER_ETH_ADDRESS);
        // let privateKey = '271D78A7A394B840EF3D04591E7CCEC4A524113F27F0B45C8BFDBC62F84CDF1B'; // [테스트]
        const to = address;

        let result;
        if (coin === 'ROZ') {
            if (!(await etherjs.isEnoughRoz(price))) {
                this.setState({ isVisible: false });
                this.onToast(`${lang.notEnoughMsg} [ROZ]`);
                return;
            }
            result = await etherjs.sendRoz(privateKey, to, price, gas);
        } else {
            if (!(await etherjs.isEnoughEth(price, gas))) {
                this.setState({ isVisible: false });
                this.onToast(`${lang.notEnoughMsg} [ETH]`);
                return;
            }
            result = await etherjs.sendEth(privateKey, to, price, gas);
        }

        if (!result) {
            this.setState({ isVisible: false });
            this.onToast(lang.TranFailMsg);
            return;
        }

        const { txListAction } = this.props;
        txListAction.addPendingTxList({ txId: result });

        this.setState({ isVisible: false });
        this.onToast(lang.TranSucMsg);
        navigation.navigate('Home');
    };

    render() {
        const { price, address, isSendDisable, gas, gasMinValue, gasMaxValue, coin, isVisible } = this.state;
        const { lang } = this.props.navigation.getScreenProps('locale');
        return (
            <SafeAreaView style={S.ContainerView}>
                <OverlayComponent isVisible={isVisible} text={lang.inProgressMsg} />
                <KeyboardAvoidingView style={{ flex: 1, padding: 20 }}>
                    <View style={S.HeaderView}>
                        <View style={S.CoinView}>
                            <IconComponent name={coin.toLowerCase()} size={30} />
                            <Text style={S.CoinText}>{coin}</Text>
                        </View>
                        <View style={S.InputView}>
                            <Text style={S.InputText}>{lang.price}</Text>
                            <TextInput style={S.InputBoxView} placeholder={lang.price} keyboardType="decimal-pad" onChangeText={text => this.setState({ price: text })} value={price.toString()} />
                        </View>
                        <View style={S.InputView}>
                            <Text style={S.InputText}>{lang.address}</Text>
                            <View style={S.AddressView}>
                                <TextInput
                                    style={[S.InputBoxView, { flex: 1, paddingRight: 50 }]}
                                    placeholder={lang.address}
                                    keyboardType="default"
                                    onChangeText={text => this.setState({ address: text })}
                                    value={address}
                                />
                                <TouchableOpacity
                                    style={S.QrIcon}
                                    onPress={() => {
                                        this.onSearch();
                                    }}>
                                    <IconComponent name={'qrcode'} size={34} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={S.InputView}>
                            <Text style={S.InputText}>{lang.fees}</Text>
                            {isSendDisable ? (
                                <PlaceholderLayout />
                            ) : (
                                <>
                                    <TextInput
                                        style={S.InputBoxView}
                                        placeholder={lang.fees}
                                        keyboardType="decimal-pad"
                                        onChangeText={text => this.setState({ gas: text > 10 ? 10 : Number(text) })}
                                        value={gas.toString()}
                                    />
                                    <View style={S.SliderView}>
                                        <Slider
                                            value={gas}
                                            onValueChange={data => this.setState({ gas: Number(parseFloat(data).toFixed(1)) })}
                                            thumbTintColor={MAIN_BLUE_COLOR}
                                            minimumTrackTintColor={MAIN_BLUE_COLOR}
                                            minimumValue={gasMinValue}
                                            maximumValue={gasMaxValue}
                                            step={0.1}
                                        />
                                    </View>
                                    <View style={S.FeeView}>
                                        <Text style={S.FeeText}>
                                            {lang.slow}
                                            {`(${gasMinValue})`}
                                        </Text>
                                        <Text style={[S.FeeText, { textAlign: 'right' }]}>
                                            {lang.fast}
                                            {`(${gasMaxValue})`}
                                        </Text>
                                    </View>
                                    <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold' }}>{gas}</Text>
                                </>
                            )}
                        </View>
                    </View>
                    <View style={S.BottomView}>
                        <Button name={lang.send} disable={isSendDisable} color={isSendDisable ? 'btn_d' : 'btn_b'} onPress={this.onCheckAuth} />
                    </View>
                </KeyboardAvoidingView>
                <ToastComponent
                    ref={ref => {
                        this.toast = ref;
                    }}
                />
            </SafeAreaView>
        );
    }
}

SendScreen.proptypes = {
    value: PropTypes.number,
    gas: PropTypes.number,
    address: PropTypes.string,
    isSendDisable: PropTypes.bool,
    isVisible: PropTypes.bool,
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
        txListStore: state.TxListReducer,
    }),
    dispatch => ({
        settingAction: bindActionCreators(settingActions, dispatch),
        txListAction: bindActionCreators(txListActions, dispatch),
    }),
)(SendScreen);
