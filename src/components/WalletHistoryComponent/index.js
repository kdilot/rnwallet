/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressActions from 'modules/AddressBookReducer';
import { setAddressBookApi } from 'api/AddressBook/AddressBookApi';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview';
import { plusColor, minusColor, dividerDarkColor } from 'constants/Color';
import Toast from 'react-native-root-toast';
import PropTypes from 'prop-types';
import styles from './styles';

class WalletHistoryComponent extends Component {
    static defaultProps = {
        data: [],
    };

    constructor(props) {
        super(props);

        this.state = {
            name: props.data.nickname ? props.data.nickname : props.data.send ? props.data.to : props.data.from,
            address: props.data.send ? props.data.from : props.data.to, //  본인주소
            to: props.data.to,
        };
    }

    onChange = text => {
        this.setState({ name: text });
    };

    onSend = address => {
        this.props.navigation.navigate('Send', { address });
    };

    addAddressBook = async () => {
        const { AddressAction } = this.props;
        const { name, to } = this.state;
        await setAddressBookApi({ address: to, nickname: name }).then(res => {
            if (res.data) {
                Toast.show('저장성공', { duration: Toast.durations.SHORT, position: 50 });
                AddressAction.setAddressBook(res.data);
            } else {
                console.error('ADDRESSBOOK LOAD ERROR');
            }
        });
    };

    render() {
        const { ts, value, status, send, from, to } = this.props.data;
        const { name, address } = this.state;
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
                    <View style={styles.contentAddressGroup}>
                        <Text style={styles.contentAddressStyle}>from</Text>
                        <Text>{from}</Text>
                        <Text style={styles.contentAddressStyle}>to</Text>
                        <Text>{to}</Text>
                    </View>
                    <View style={styles.contentTextGroup}>
                        <Text style={styles.contentTextStyle}>{status}</Text>
                        <Text style={[styles.contentTextStyle, styles.alignRight]}>{ts}</Text>
                    </View>
                    <View style={styles.contentTextGroup}>
                        <Text style={[styles.contentTextStyle, styles.TextColor(send ? plusColor : minusColor)]}>{send ? 'Sent' : 'Receive'}</Text>
                        <Text style={[styles.contentTextStyle, styles.alignRight, { fontWeight: 'bold' }]}>{`$${value}`}</Text>
                    </View>
                </View>
            </CardView>
        );
    }
}

WalletHistoryComponent.proptypes = {
    data: PropTypes.number,
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
