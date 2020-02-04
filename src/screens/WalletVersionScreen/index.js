/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, SafeAreaView, Image } from 'react-native';
import { Icon } from 'components';
import S from './styles';

export default class WalletVersionScreen extends Component {
    render() {
        return (
            <SafeAreaView style={S.ContainerView}>
                <Image source={Icon['img_comingsoon']} style={{ width: 140, height: 100 }} />
                <Text style={S.MsgTitleText}>Service Unavailable</Text>
                <Text style={S.MsgContentText}>Sorry for causing all the inconveniences</Text>
            </SafeAreaView>
        );
    }
}
