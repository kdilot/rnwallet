import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IconComponent } from 'components';
import styles from './styles';

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
            <View style={this.state.isExtended ? styles['container--extended'] : styles.container}>
                <View style={styles.faq}>
                    <View style={styles.faq__iconBox}>
                        <IconComponent name={'eth'} size={20} />
                    </View>
                    <View style={styles.faq__titleBox}>
                        <Text>{title}</Text>
                    </View>
                    <View style={styles.faq__btnBox}>
                        <TouchableOpacity style={styles.faq__btnTouchBox} onPress={this.toggleContents}>
                            <IconComponent name={'eth'} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={this.state.isExtended ? styles['faq--extended'] : styles['faq--none']}>
                    <View style={styles['faq--extended__iconBox']}>
                        <IconComponent name={'eth'} size={20} />
                    </View>
                    <View style={styles['faq--extended__contentsBox']}>
                        <Text>{contents}</Text>
                    </View>
                </View>
            </View>
        );
    }
}
