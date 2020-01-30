import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const HEIHGT = Dimensions.get('screen').height;

export default class PopupComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isCloseable: true,
            isClose: true,
            title: 'Title',
            content: 'Message...',
        };
    }

    closePopup = () => {
        this.setState({ isClose: true });
    };

    showPopup = (title, content) => {
        this.setState({ isClose: false });
        if (title && content) {
            this.setState({ title, content });
        }
    };

    showPopupBtn = (title, content) => {
        this.setState({ isClose: false, isCloseable: false });
        if (title && content) {
            this.setState({ title, content });
        }
    };

    render() {
        const { children } = this.props;
        const { isClose, isCloseable, title, content } = this.state;
        return (
            <View style={styles.container}>
                <View style={[styles.backgroundLayout, isClose && { top: HEIHGT }]}>
                    {isCloseable && (
                        <TouchableOpacity style={styles.closeLayout} activeOpacity={0.8} onPress={this.closePopup}>
                            <Text style={styles.closeText}>X</Text>
                        </TouchableOpacity>
                    )}
                    <View style={styles.msgLayout}>
                        <View style={styles.msgHeaderLayout}>
                            <Text style={styles.msgHeaderText}>{title}</Text>
                        </View>
                        <View style={styles.msgContentLayout}>
                            <Text>{content}</Text>
                        </View>
                    </View>
                </View>
                {children}
            </View>
        );
    }
}

PopupComponent.propTypes = {
    isCloseable: PropTypes.bool,
    isClose: PropTypes.bool,
    closePopup: PropTypes.func,
    showPopup: PropTypes.func,
    showPopupBtn: PropTypes.func,
    children: PropTypes.object,
};
