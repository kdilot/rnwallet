/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as settingActions from 'modules/SettingReducer';
import * as txListActions from 'modules/TxListReducer';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonComponent from 'components/ButtonComponent';
import ToastComponent from 'components/ToastComponent';
import OverlayComponent from 'components/OverlayComponent';
import { getGasPrice } from 'api/EtherChain';
import * as etherjs from 'api/etherjs';
import RNSecureKeyStore from 'react-native-secure-key-store';
import { USER_ETH_ADDRESS } from 'constants/Global';
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
            <KeyboardAvoidingView style={styles.container}>
                <OverlayComponent isVisible={isVisible} text={lang.inProgressMsg} />
                <View style={styles.headerLayout}>
                    <View>
                        <Text style={styles.coinTextStyle}>{coin}</Text>
                    </View>
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
                                <View style={styles.sliderLayout}>
                                    <Slider
                                        value={gas}
                                        onValueChange={data => this.setState({ gas: Number(parseFloat(data).toFixed(1)) })}
                                        thumbTintColor={basicColor}
                                        minimumTrackTintColor={basicColor}
                                        minimumValue={gasMinValue}
                                        maximumValue={gasMaxValue}
                                        step={0.1}
                                    />
                                </View>
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
