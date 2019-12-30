/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as settingActions from 'modules/SettingReducer';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonComponent from 'components/ButtonComponent';
import { basicColor } from 'constants/Color';
import PropTypes from 'prop-types';
import styles from './styles';

class SendScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 999,
            address: null,
            fee: 1,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', payload => {
            if (payload.state.params) {
                this.setState({ address: payload.state.params.address });
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
        this.setState({ address });
    };

    onSend = () => {
        const { list } = this.props.settingStore;
        // 데이터 전송 로직 필요
        this.props.navigation.navigate(list.fingerprint === 'on' ? 'FingerPrint' : list.pin === 'on' ? 'PinCode' : 'Home');
    };

    render() {
        const { value, address, fee } = this.state;
        const { lang } = this.props.navigation.getScreenProps('locale');
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.headerLayout}>
                    <View style={styles.textareaLayout}>
                        <Text style={styles.textStyle}>{lang.price}</Text>
                        <TextInput style={styles.textInputStyle} placeholder={lang.price} keyboardType="phone-pad" onChangeText={text => this.setState({ value: text })} value={value.toString()} />
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
                        <TextInput
                            style={styles.textInputStyle}
                            placeholder={lang.fees}
                            keyboardType="phone-pad"
                            onChangeText={text => this.setState({ fee: text > 10 ? 10 : Number(text) })}
                            value={fee.toString()}
                        />
                        <Slider
                            value={fee}
                            onValueChange={data => this.setState({ fee: Number(data.toFixed(1)) })}
                            thumbTintColor={basicColor}
                            minimumTrackTintColor={basicColor}
                            minimumValue={1}
                            maximumValue={10}
                            step={0.1}
                        />
                        <View style={styles.feeTextLayout}>
                            <Text style={styles.feeTextStyle}>{lang.slow}</Text>
                            <Text style={[styles.feeTextStyle, { textAlign: 'right' }]}>{lang.fast}</Text>
                        </View>
                        <Text style={{ textAlign: 'center' }}>Value: {fee}</Text>
                    </View>
                </View>
                <View style={styles.buttonLayout}>
                    <ButtonComponent
                        name={lang.send}
                        onPress={() => {
                            this.onSend();
                        }}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
}

SendScreen.proptypes = {
    value: PropTypes.number,
    fee: PropTypes.number,
    address: PropTypes.string,
    onSearch: PropTypes.func,
    onSend: PropTypes.func,
    setAddress: PropTypes.func,
};

export default connect(
    state => ({
        settingStore: state.SettingReducer,
    }),
    dispatch => ({
        settingAction: bindActionCreators(settingActions, dispatch),
    }),
)(SendScreen);
