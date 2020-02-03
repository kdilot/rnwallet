/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IconComponent } from 'components';
import styles from './styles';

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
                        <IconComponent name={'eth'} size={20} />
                        <IconComponent name={'eth'} size={20} style={{ marginLeft: 10 }} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
