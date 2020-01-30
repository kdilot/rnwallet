import React, { Component } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ethPng from 'asset/icon/eth.png';

export default class FaqComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isExtended: false,
        };
    }

    static defaultProps = {
        faq: {
            no: 1,
            title: '',
            contents: '',
        },
    };

    toggleContents = () => {
        if (this.state.isExtended) {
            this.setState({
                isExtended: false,
            });
        } else {
            this.setState({
                isExtended: true,
            });
        }
    };

    render() {
        const { no, title, contents } = this.props.faq;
        return (
            <View
                style={
                    this.state.isExtended
                        ? styles['container--extended']
                        : styles.container
                }>
                <View style={styles.faq}>
                    <View style={styles.faq__iconBox}>
                        <ImageBackground
                            style={{ width: 20, height: 20 }}
                            source={ethPng}></ImageBackground>
                    </View>
                    <View style={styles.faq__titleBox}>
                        <Text>{title}</Text>
                    </View>
                    <View style={styles.faq__btnBox}>
                        <TouchableOpacity
                            style={styles.faq__btnTouchBox}
                            onPress={this.toggleContents}>
                            <ImageBackground
                                style={{ width: 20, height: 20 }}
                                source={ethPng}></ImageBackground>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={
                        this.state.isExtended
                            ? styles['faq--extended']
                            : styles['faq--none']
                    }>
                    <View style={styles['faq--extended__iconBox']}>
                        <ImageBackground
                            style={{ width: 20, height: 20 }}
                            source={ethPng}></ImageBackground>
                    </View>
                    <View style={styles['faq--extended__contentsBox']}>
                        <Text>{contents}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
