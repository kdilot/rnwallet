/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, TouchableOpacity, ImageBackground, Text } from 'react-native';
import { Icon } from 'components';

export default class ButtonComponent extends Component {
    static defaultProps = {
        name: 'button',
        disable: false,
        onPress: null,
        color: 'btn_sm_b',
    };
    render() {
        const { name, disable, onPress, color } = this.props;
        return (
            <TouchableOpacity onPress={!disable && onPress}>
                <ImageBackground source={Icon[color]} style={{ width: '100%', height: 70 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, color: 'white' }}>{name}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    }
}
