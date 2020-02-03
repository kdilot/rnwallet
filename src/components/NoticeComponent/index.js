import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import styles from './styles';
import ic_more from 'asset/icon/ic_more.png';
import ic_new from 'asset/icon/ic_new.png';
import { TouchableHighlight } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

export default class NoticeComponent extends Component {
    static defaultProps = {
        notice: {
            no: 1,
            title: '',
            inDt: new Date(),
            pressNotice: () => {},
            isNew: true,
        },
    };

    componentDidMount() {
        AsyncStorage.getItem('notice' + this.props.notice.no).then(res => {
            if (res) {
                this.setState({ isNew: false });
            }
        });
    }

    pressNotice = () => {
        this.props.pressNotice(this.props.notice);
    };

    render() {
        return (
            <TouchableHighlight onPress={this.pressNotice} underlayColor="#f2f2f2">
                <View style={styles.container}>
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>{this.props.notice.title}</Text>
                        <Text style={styles.inDt}>{this.props.notice.inDt}</Text>
                    </View>
                    <View style={styles.btnBox}>
                        {this.props.notice.isNew ? <ImageBackground style={styles.newIcon} source={ic_new} /> : <View style={styles.newIcon}></View>}
                        <ImageBackground style={styles.moreBtn} source={ic_more} />
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
