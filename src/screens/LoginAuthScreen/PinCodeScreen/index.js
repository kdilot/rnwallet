import React, { Component } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { PinInput } from 'react-native-pins';
import { VirtualKeyboard } from 'react-native-screen-keyboard';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import styles from './styles';

const NEW_PIN = 1;
const CONFIRM_PIN = 2;
const ACCESS_PIN = 3;
const RESET_ARRAY = new Array(0);

export default class PinCode extends Component {
    static defaultProps = {
        maxPin: 6,
        maxCount: 5,
        status: null,
    };
    constructor(props) {
        super(props);

        this.state = {
            pinNumber: RESET_ARRAY,
            newPinNumber: null, // Async 키 정보
            isCount: 1,
            status: props.status,
            sendData: null,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', payload => {
            this.getPin();
            if (payload.state.params) {
                const { sendData } = payload.state.params;
                this.setState({ sendData: sendData });
            }
        });
    }

    componentWillUnmount = () => {
        this.focusListener.remove();
    };

    shouldComponentUpdate(nextProps, nextState) {
        const { maxPin, maxCount } = this.props;
        const { newPinNumber, status, isCount, sendData } = this.state;
        const { lang } = this.props.navigation.getScreenProps('locale');
        const confirmPinNumber = nextState.pinNumber ? nextState.pinNumber.join('') : RESET_ARRAY;
        if (nextState.pinNumber.length === maxPin && status === NEW_PIN && !nextState.newPinNumber) {
            this.setState({
                newPinNumber: confirmPinNumber,
                status: CONFIRM_PIN,
                pinNumber: RESET_ARRAY,
            });
            this.blockKeyboard(500);
        } else if (nextState.pinNumber.length === maxPin && status === CONFIRM_PIN) {
            if (confirmPinNumber === newPinNumber) {
                AsyncStorage.setItem('pincode', newPinNumber);
                if (sendData) {
                    this.setState({
                        status: ACCESS_PIN,
                        pinNumber: RESET_ARRAY,
                    });
                    this.blockKeyboard(500);
                } else {
                    this.props.navigation.navigate('Setting', { name: 'pin' });
                }
            } else {
                this.setState({
                    status: NEW_PIN,
                    newPinNumber: null,
                    pinNumber: RESET_ARRAY,
                });
                this.blockKeyboard(1500, lang.confirmPinMsg);
            }
        } else if (nextState.pinNumber.length === maxPin && status === ACCESS_PIN) {
            if (confirmPinNumber === newPinNumber) {
                this.props.navigation.navigate('Send', { sendData });
            } else {
                this.setState({
                    pinNumber: RESET_ARRAY,
                    isCount: isCount + 1,
                });
                maxCount === isCount ? this.blockKeyboard(30000, lang.pinTimeoutMsg) : this.blockKeyboard(1500, lang.accessPinMsg);
            }
        }
        return true;
    }

    getPin = async () => {
        const number = await AsyncStorage.getItem('pincode');
        if (number) {
            this.setState({ newPinNumber: number, status: ACCESS_PIN });
        } else {
            this.setState({ newPinNumber: null, status: NEW_PIN });
        }
    };

    blockKeyboard = (timer, msg = null) => {
        this.keyboard.disable();
        msg && this.keyboard.displayMessage(msg);
        setTimeout(() => {
            msg && this.keyboard.clearMessage();
            this.keyboard.enable();
        }, timer);
    };

    keyDown = key => {
        const { pinNumber } = this.state;
        const length = pinNumber.length;
        if (key !== 'custom') {
            this.setState({ pinNumber: key === 'back' ? (length > 0 ? pinNumber.slice(0, length - 1) : RESET_ARRAY) : pinNumber.concat(key) });
        }
    };
    render() {
        const { pinNumber, status, newPinNumber } = this.state;
        const { maxPin } = this.props;
        const { lang } = this.props.navigation.getScreenProps('locale');
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.titleLayout}>
                    <Text style={styles.pinTextStyle}>{status === NEW_PIN ? lang.newPin : status === CONFIRM_PIN ? lang.confirmPin : status === ACCESS_PIN ? lang.accessPin : ''}</Text>
                </View>
                <View style={styles.pinLayout}>
                    <PinInput
                        onRef={ref => (this.pin = ref)}
                        numberOfPins={maxPin}
                        numberOfPinsActive={pinNumber.length ? pinNumber.length : 0}
                        containerStyle={styles.pinContainerStyle}
                        pinStyle={styles.pinStyle}
                        pinActiveStyle={styles.pinActiveStyle}
                    />
                </View>
                <View style={styles.restoreLayout}>
                    {newPinNumber && status === ACCESS_PIN && (
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('PinCodeRestore', { isPinRestore: true });
                            }}>
                            <Text style={styles.restoreTextStyle}>Forgot PIN?</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.inputLayout}>
                    <VirtualKeyboard onRef={ref => (this.keyboard = ref)} onKeyDown={this.keyDown} keyStyle={styles.keyStyle} keyboardStyle={styles.keyboardStyle} />
                </View>
            </SafeAreaView>
        );
    }
}

PinCode.proptpes = {
    NEW_PIN: PropTypes.number.isRequired,
    CONFIRM_PIN: PropTypes.number.isRequired,
    ACCESS_PIN: PropTypes.number.isRequired,
    maxPin: PropTypes.number.isRequired,
    maxCount: PropTypes.number.isRequired,
    isCount: PropTypes.number,
    status: PropTypes.number.isRequired,
    pinNumber: PropTypes.number.array,
    newPinNumber: PropTypes.number.string,
    keyDown: PropTypes.func,
    blockKeyboard: PropTypes.func,
};
