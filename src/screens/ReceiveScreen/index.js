/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { OutlinedTextField } from 'react-native-material-textfield';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonComp from 'components/ButtonComp';
import { basicColor } from 'constants/Color';
import styles from './styles';

export default class ReceiveScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 999,
            address: null,
            fee: 1,
            qrActive: false,
        };
    }

    setQrcode = () => {
        return (
            <TouchableOpacity
                style={styles.textareaIconStyle}
                onPress={() => {
                    this.onSearch();
                }}>
                <Ionicons name="qrcode-scan" size={30} />
            </TouchableOpacity>
        );
    };

    // componentDidMount() {
    //     const { navigation } = this.props;
    //     this.focusListener = navigation.addListener('didFocus', payload => {
    //         console.log('recieve', payload);
    //     });
    // }

    onSearch = () => {
        // this.setState({ value: 1212512 });
        this.props.navigation.navigate('QrcodeScanner', { setAddress: this.setAddress });
    };

    setAddress = address => {
        this.setState({ qrActive: true, address });
    };

    onSend = () => {
        console.log(1);
    };

    render() {
        const { value, address, fee, qrActive } = this.state;
        return (
            <KeyboardAvoidingView style={styles.container} enabled>
                <View style={styles.headerLayout}>
                    <View style={styles.textareaGroup}>
                        <View style={styles.textareaLayout}>
                            <OutlinedTextField
                                label="금액"
                                keyboardType="phone-pad"
                                tintColor={basicColor}
                                labelTextStyle={{ paddingTop: 3 }}
                                onChangeText={text => this.setState({ address: text })}
                                value={value.toString()}
                            />
                        </View>
                    </View>
                    <View style={styles.textareaGroup}>
                        <View style={styles.textareaLayout}>
                            {qrActive === 3 ? (
                                <Text>{address}</Text>
                            ) : (
                                <OutlinedTextField
                                    label="주소"
                                    keyboardType="default"
                                    renderRightAccessory={this.setQrcode}
                                    tintColor={basicColor}
                                    labelTextStyle={{ paddingTop: 3 }}
                                    onChangeText={text => this.setState({ address: text })}
                                    value={address}
                                />
                            )}
                        </View>
                    </View>
                    <View style={styles.textareaGroup}>
                        <View style={styles.textareaLayout}>
                            <OutlinedTextField label="수수료" keyboardType="phone-pad" onChangeText={text => this.setState({ fee: text })} value={fee.toString()} />
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
                                <Text style={styles.feeTextStyle}>Slow</Text>
                                <Text style={[styles.feeTextStyle, { textAlign: 'right' }]}>Fast</Text>
                            </View>
                            <Text style={{ textAlign: 'center' }}>Value: {fee}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonLayout}>
                    <ButtonComp
                        name={'보내기'}
                        onPress={() => {
                            this.onSend();
                        }}
                    />
                </View>
            </KeyboardAvoidingView>
        );
    }
}
