/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressActions from 'modules/AddressBookReducer';
import { setAddressBookApi } from 'api/AddressBookApi';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { whiteColor, plusColor, minusColor, dividerDarkColor } from 'constants/Color';
import PropTypes from 'prop-types';
import styles from './styles';

class WalletHistoryComponent extends Component {
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

    onSend = address => {
        this.props.navigation.navigate('Send', { address });
    };

    addAddressBook = async () => {
        const { AddressAction, address } = this.props;
        const { name } = this.state;
        await setAddressBookApi({ address, nickname: name }).then(res => {
            if (res.data) {
                // Alert 필요
                AddressAction.setAddressBook(res.data);
            } else {
                console.error('ADDRESSBOOK LOAD ERROR');
            }
        });
    };

    render() {
        const { send, status, date, value, address } = this.props;
        const { name } = this.state;
        return (
            <CardView cardElevation={5} cornerRadius={10} style={styles.cardLayout}>
                <View style={[styles.addressLayout, styles.borderColor(send ? plusColor : minusColor)]}>
                    <View style={styles.addressTextfield}>
                        <TextInput value={name} keyboardType={'default'} onChangeText={text => this.onChange(text)} />
                    </View>
                </View>
                <View style={styles.addressButtonLayout}>
                    <TouchableOpacity style={styles.addressButtonGroup} onPress={() => this.addAddressBook()}>
                        <Text style={[styles.addressButtonTextStlye, styles.TextColor(dividerDarkColor)]}>주소록에 저장</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addressButtonGroup} onPress={() => this.onSend(address)}>
                        <Text style={[styles.addressButtonTextStlye, styles.TextColor(dividerDarkColor), { textAlign: 'right' }]}>보내기</Text>
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
    onChange: PropTypes.func,
    onSend: PropTypes.func,
    addAddressBook: PropTypes.func,
};

export default connect(
    state => ({
        addressBook: state.AddressBookReducer,
    }),
    dispatch => ({
        AddressAction: bindActionCreators(addressActions, dispatch),
    }),
)(WalletHistoryComponent);
