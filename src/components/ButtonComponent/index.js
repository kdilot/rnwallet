import React, { Component } from 'react';
import { View } from 'react-native';
import Button from 'react-native-button';
import { basicColor } from 'constants/Color';
import styles from './styles';

export default class ButtonComponent extends Component {
    static defaultProps = {
        name: 'button',
        disable: false,
        onPress: null,
        color: basicColor,
        outline: false,
        radius: 5,
        style: null,
    };
    render() {
        const { name, disable, onPress, color, outline, radius, style } = this.props;
        return (
            <View style={styles.container}>
                <Button
                    style={[styles.buttonTextLayout({ color, outline })]}
                    disabled={disable}
                    styleDisabled={styles.disText}
                    containerStyle={[styles.buttonLayout({ color, outline, radius }), style]}
                    disabledContainerStyle={styles.disContainer}
                    activeOpacity={0.7}
                    onPress={onPress}>
                    {name}
                </Button>
            </View>
        );
    }
}
