import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import styles from './styles';
import PropTypes from 'prop-types';

export default class OverlayComponent extends Component {
    static defaultProps = {
        text: 'Overlay Text',
        isVisible: false,
        height: '20%',
    };
    render() {
        const { isVisible, text, height } = this.props;
        return (
            <Overlay isVisible={isVisible} height={height}>
                <View style={styles.container}>
                    <Text style={styles.textStyle}>{text}</Text>
                </View>
            </Overlay>
        );
    }
}

OverlayComponent.propTypes = {
    text: PropTypes.string,
    isVisible: PropTypes.bool,
    height: PropTypes.string,
};
