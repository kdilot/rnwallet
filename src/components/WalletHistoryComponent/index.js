/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { whiteColor, plusColor, minusColor, dividerDarkColor } from 'constants/Color';
import PropTypes from 'prop-types';
import styles from './styles';

export default class WalletHistoryComponent extends Component {
    static defaultProps = {
        send: true,
        address: '0x8A52B2a07CE959B54c6dB876CBcb2850A35E37aB',
        status: '-',
        date: '-',
        value: '5223',
    };

    constructor(props) {
        super(props);

        this.state = {
            name: props.address,
        };
    }

    onChange = text => {
        this.setState({ name: text });
    };

    render() {
        const { send, status, date, value } = this.props;
        const { name } = this.state;
        return (
            <CardView cardElevation={5} cornerRadius={10} style={styles.cardLayout}>
                <View style={[styles.addressLayout, styles.borderColor(send ? plusColor : minusColor)]}>
                    <View style={styles.addressTextfield}>
                        <TextInput value={name} keyboardType={'default'} onChangeText={text => this.onChange(text)} />
                    </View>
                </View>
                <View style={styles.addressButtonLayout}>
                    <TouchableOpacity>
                        <Text style={[styles.addressButtonTextStlye, styles.TextColor(dividerDarkColor)]}>주소록에 저장</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentLayout}>
                    <View style={styles.contentIconLayout}>
                        <View style={[styles.contentIconStyle, styles.IconColor(send ? plusColor : minusColor)]}>
                            <Ionicons name={`md-arrow-round-${send ? 'up' : 'down'}`} size={50} color={whiteColor} />
                        </View>
                    </View>
                    <View style={styles.contentTextLayout}>
                        <View style={styles.contentTextGroup}>
                            <Text style={[styles.contentTextStyle, styles.TextColor(send ? plusColor : minusColor)]}>{send ? 'Sent' : 'Receive'}</Text>
                            <Text style={[styles.contentTextStyle, styles.alignRight, { fontWeight: 'bold' }]}>{`$${value}`}</Text>
                        </View>
                        <View style={styles.contentTextGroup}>
                            <Text style={styles.contentTextStyle}>{status}</Text>
                            <Text style={[styles.contentTextStyle, styles.alignRight]}>{date}</Text>
                        </View>
                    </View>
                </View>
            </CardView>
        );
    }
}

WalletHistoryComponent.proptypes = {
    address: PropTypes.string,
    name: PropTypes.string,
    status: PropTypes.string,
    date: PropTypes.string,
    value: PropTypes.number,
};
