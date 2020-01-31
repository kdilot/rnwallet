import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import styles from './styles';
import ethPng from 'asset/icon/eth.png';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class NoticeComponent extends Component {
    static defaultProps = {
        notice: {
            no: 1,
            title: '',
            inDt: new Date(),
            pressNotice: function() {},
        },
    };

    pressNotice = () => {
        this.props.pressNotice(this.props.notice);
    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.container__touch} onPress={this.pressNotice}>
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>{this.props.notice.title}</Text>
                        <Text style={styles.inDt}>{this.props.notice.inDt}</Text>
                    </View>
                    <View style={styles.btnBox}>
                        <ImageBackground style={{ width: 20, height: 20 }} source={ethPng} />
                        <ImageBackground style={{ width: 20, height: 20, marginLeft: 10 }} source={ethPng} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
