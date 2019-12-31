/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressActions from 'modules/AddressBookReducer';
import { setAddressBookApi } from 'api/AddressBook/AddressBookApi';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview';
import { dividerLightColor, dividerDarkColor } from 'constants/Color';
import Toast from 'react-native-root-toast';
import PropTypes from 'prop-types';
import styles from './styles';

class AddressBookComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: props.nickname,
            address: props.address,
        };
    }

    onChange = text => {
        this.setState({ nickname: text });
    };

    onSend = () => {
        const { AddressAction, address } = this.props;
        const { lang } = this.props.navigation.getScreenProps('locale');
        const { nickname } = this.state;

        setAddressBookApi({ address, nickname }).then(addressBookMap => {
            if (!addressBookMap || addressBookMap === {}) {
                return;
            }

            Toast.show(lang.saveMsg, { duration: Toast.durations.SHORT, position: 50 });
            AddressAction.setAddressBook(addressBookMap);
        });
    };

    onHistory = () => {
        const { address } = this.props;
        this.props.navigation.navigate('WalletHistory', { itemType: 3, address });
    };

    render() {
        const { address, nickname } = this.state;
        const { lang } = this.props.navigation.getScreenProps('locale');
        return (
            <View style={styles.container}>
                <CardView cardElevation={5} cornerRadius={0} style={styles.cardLayout}>
                    <View style={styles.textLayout}>
                        <View style={[styles.textInputLayout, styles.borderColor(dividerLightColor)]}>
                            <TextInput value={nickname ? nickname : address} keyboardType={'default'} onChangeText={text => this.onChange(text)} />
                        </View>
                        <View>
                            <Text style={styles.addressTextStyle} numberOfLines={1} ellipsizeMode="middle">
                                {address}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.historyButtonLayout} onPress={() => this.onHistory()}>
                            <Text style={[styles.addressButtonTextStlye, styles.TextColor(dividerDarkColor)]}>{lang.walletHistory}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.sendButtonLayout} onPress={() => this.onSend()}>
                        <Text style={[styles.addressButtonTextStlye, styles.TextColor(dividerDarkColor), { textAlign: 'right' }]}>{lang.save}</Text>
                    </TouchableOpacity>
                </CardView>
            </View>
        );
    }
}

AddressBookComponent.propTypes = {
    address: PropTypes.string,
    nickname: PropTypes.string,
    onChange: PropTypes.func,
    onSend: PropTypes.func,
    onHistory: PropTypes.func,
};

export default connect(
    state => ({
        addressBookStore: state.AddressBookReducer,
    }),
    dispatch => ({
        AddressAction: bindActionCreators(addressActions, dispatch),
    }),
)(AddressBookComponent);
