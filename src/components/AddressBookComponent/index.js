import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview';
import { dividerLightColor, dividerDarkColor } from 'constants/Color';
import PropTypes from 'prop-types';
import styles from './styles';

export default class AddressBookComponent extends Component {
    static defaultProps = {
        address: '0x8A52B2a07CE959B54c6dB876CBcb2850A35E37aB',
        nickname: '테스트',
    };

    constructor(props) {
        super(props);

        this.state = {
            name: props.nickname,
        };
    }

    onChange = text => {
        this.setState({ name: text });
    };

    render() {
        const { address } = this.props;
        const { name } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.addressTextStyle}>{address}</Text>
                <CardView cardElevation={10} cornerRadius={10} style={styles.cardLayout}>
                    <View style={[styles.addressLayout, styles.borderColor(dividerLightColor)]}>
                        <View style={styles.addressTextfield}>
                            <TextInput value={name} keyboardType={'default'} onChangeText={text => this.onChange(text)} />
                        </View>
                    </View>
                    <View style={styles.addressButtonLayout}>
                        <TouchableOpacity>
                            <Text style={[styles.addressButtonTextStlye, styles.TextColor(dividerDarkColor)]}>저장</Text>
                        </TouchableOpacity>
                    </View>
                </CardView>
            </View>
        );
    }
}

AddressBookComponent.proptypes = {
    address: PropTypes.string,
    nickname: PropTypes.string,
};
