/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';
import PinView from 'react-native-pin-view';
import { basicColor } from 'constants/Color';
import styles from './PinCode.styles';

const PinCode = ({ text = 'PIN CODE', color = basicColor, pinLength = 6, action }) => {
    return (
        <View style={styles.container}>
            <View style={styles.textLayout}>
                <Text style={styles.text}>{text}</Text>
            </View>
            <View style={styles.pinLayout}>
                <PinView
                    onComplete={(val, clear) => {
                        action({ number: val });
                        clear();
                    }}
                    pinLength={pinLength}
                    inputBgColor={color}
                    inputActiveBgColor={color}
                    keyboardContainerStyle={{ marginTop: 0 }}
                    buttonTextColor={color}
                    keyboardViewStyle={{
                        borderWidth: 1,
                        borderColor: color,
                    }}
                    buttonDeletePosition={'right'}
                    deleteText={'Back'}
                />
            </View>
        </View>
    );
};

export default PinCode;
