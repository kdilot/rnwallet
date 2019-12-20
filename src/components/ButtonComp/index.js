import React, { Component } from 'react';
import { View } from 'react-native';
import Button from 'react-native-button';
import styles from './styles';

export default class ButtonComp extends Component {
    static defaultProps = {
        name: 'button',
        disable: false,
        onPress: null,
        color: '#2196F3',
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
