import React, { Component } from 'react';
import { Switch, Text, View } from 'react-native';
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
                    <Text>{text}</Text>
                </View>
                <View style={styles.toggleLayout}>
                    <Switch onValueChange={this.toggleSwitch} value={switchValue} thumbColor={'#ede8e8'} trackColor={{ false: '#ADB0B2', true: '#2196F3' }} />
                </View>
            </View>
        );
    }
}
