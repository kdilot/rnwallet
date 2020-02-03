import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IconComponent } from 'components';
import styles from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
            <TouchableWithoutFeedback onPress={this.toggleContents}>
                <View style={this.state.isExtended ? styles['container--extended'] : styles.container}>
                    <View style={styles.faq}>
                        <View style={styles.faq__iconBox}>
                            <IconComponent name={'ic_question'} size={18} />
                        </View>
                        <View style={styles.faq__titleBox}>
                            <Text style={styles.faq__title}>{title}</Text>
                        </View>
                        <View style={styles.faq__btnBox}>
                            <IconComponent name={this.state.isExtended ? 'ic_hidden' : 'ic_open'} size={34} />
                        </View>
                    </View>
                    <View style={this.state.isExtended ? styles['faq--extended'] : styles['faq--none']}>
                        <View style={styles['faq--extended__iconBox']}>
                            <IconComponent name={'ic_answer'} size={18} />
                        </View>
                        <View style={styles['faq--extended__contentsBox']}>
                            <Text style={styles['faq--extended__contents']}>{contents}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
