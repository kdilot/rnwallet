import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { PinInput } from 'react-native-pins';
import { VirtualKeyboard } from 'react-native-screen-keyboard';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import styles from './styles';

const NEW_PIN = 1;
const CONFIRM_PIN = 2;
const ACCESS_PIN = 3;

export default class PinCode extends Component {
    static defaultProps = {
        maxPin: 6,
        maxCount: 5,
        status: NEW_PIN,
    };
    constructor(props) {
        super(props);

        this.state = {
            pinNumber: new Array(0),
            newPinNumber: null, // Async 키 정보
            isCount: 1,
            status: props.status,
        };
    }

    componentDidMount() {
        this.getPin();
    }

    shouldComponentUpdate(nextProps, nextState) {
        const { maxPin, maxCount } = this.props;
        const { newPinNumber, status, isCount } = this.state;
        const confirmPinNumber = nextState.pinNumber ? nextState.pinNumber.join('') : [];
        if (nextState.pinNumber.length === maxPin && status === NEW_PIN && !nextState.newPinNumber) {
            this.setState({
                newPinNumber: confirmPinNumber,
                status: CONFIRM_PIN,
                pinNumber: new Array(0),
            });
            this.blockKeyboard(500);
        } else if (nextState.pinNumber.length === maxPin && status === CONFIRM_PIN) {
            if (confirmPinNumber === newPinNumber) {
                AsyncStorage.setItem('pincode', newPinNumber);
                this.setState({
                    status: ACCESS_PIN,
                    pinNumber: new Array(0),
                });
                this.blockKeyboard(500);
            } else {
                this.setState({
                    status: NEW_PIN,
                    newPinNumber: null,
                    pinNumber: new Array(0),
                });
                this.blockKeyboard(1500, 'WRONG CONFIRM PIN NUMBER');
            }
        } else if (nextState.pinNumber.length === maxPin && status === ACCESS_PIN) {
            if (confirmPinNumber === newPinNumber) {
                this.props.navigation.navigate('Home');
            } else {
                this.setState({
                    pinNumber: new Array(0),
                    isCount: isCount + 1,
                });
                maxCount === isCount ? this.blockKeyboard(30000, 'YOU CAN TRY AFTER 30 SEC') : this.blockKeyboard(1500, 'WRONG PIN NUMBER');
            }
        }
        return true;
    }

    getPin = async () => {
        await AsyncStorage.getItem('pincode').then(number => {
            number && this.setState({ newPinNumber: number, status: ACCESS_PIN });
        });
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
        this.setState({ pinNumber: key === 'back' ? length > 0 && pinNumber.slice(0, length - 1) : pinNumber.concat(key) });
    };
    render() {
        const { pinNumber, status, newPinNumber } = this.state;
        const { maxPin } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.textLayout}>
                    <Text style={styles.pinTextStyle}>{newPinNumber}</Text>
                    <Text style={styles.pinTextStyle}>{status === NEW_PIN ? 'New PIN' : status === CONFIRM_PIN ? 'Confirm PIN' : 'Access PIN'}</Text>
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
                <View style={styles.inputLayout}>
                    <VirtualKeyboard onRef={ref => (this.keyboard = ref)} onKeyDown={this.keyDown} />
                </View>
            </View>
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
