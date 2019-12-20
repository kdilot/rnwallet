import React, { Component } from 'react';
import { Switch, Text, View } from 'react-native';
import { basicColor, dividerDarkColor, dividerLightColor } from 'constants/Color';
import PropTypes from 'prop-types';
import styles from './styles';

export default class SwitchButtonLayout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            switchValue: false,
        };
    }

    toggleSwitch = value => {
        this.setState({ switchValue: value });
    };

    render() {
        const { text } = this.props;
        const { switchValue } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.textLayout}>
                    <Text style={styles.textStyle}>{text}</Text>
                </View>
                <View style={styles.toggleLayout}>
                    <Switch onValueChange={this.toggleSwitch} value={switchValue} thumbColor={dividerLightColor} trackColor={{ false: dividerDarkColor, true: basicColor }} />
                </View>
            </View>
        );
    }
}

SwitchButtonLayout.propTypes = {
    switchValue: PropTypes.bool,
    text: PropTypes.string.isRequired,
    toggleSwitch: PropTypes.func,
};
