import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressActions from 'modules/AddressBookReducer';
import * as addressBookApi from 'api/AddressBook/AddressBookApi';
import { Text, View, TextInput, TouchableOpacity, Clipboard } from 'react-native';
import { IconComponent } from 'components';
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
        const { AddressAction, address, toast } = this.props;
        const { lang } = this.props.navigation.getScreenProps('locale');
        const { nickname } = this.state;

        addressBookApi.setAddressBookApi({ address, nickname }).then(addressBookMap => {
            if (!addressBookMap || addressBookMap === {}) {
                return;
            }

            AddressAction.setAddressBook(addressBookMap);
            toast.showToast(lang.saveMsg);
        });
    };

    onCopy = text => {
        const { toast } = this.props;
        const { lang } = this.props.navigation.getScreenProps('locale');
        Clipboard.setString(text);
        toast.showToast(lang.copy);
    };

    render() {
        const { address, nickname } = this.state;
        return (
            <View style={styles.ContainerView}>
                <View style={styles.TextView}>
                    <View style={styles.TextInputView}>
                        {nickname ? (
                            <TextInput style={styles.InputView} value={nickname} keyboardType={'default'} onChangeText={text => this.onChange(text)} />
                        ) : (
                            <TextInput style={styles.InputView} placeholderTextColor={'#c6c6c6'} placeholder="Input nickname" keyboardType={'default'} onChangeText={text => this.onChange(text)} />
                        )}
                    </View>
                    <View style={styles.AddressView}>
                        <Text style={styles.AddressText} numberOfLines={1} ellipsizeMode="middle">
                            {address}
                        </Text>
                        <TouchableOpacity
                            onPress={() => {
                                this.onCopy(address);
                            }}>
                            <IconComponent name={'btn_copy_02'} size={30} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.ButtonView}>
                    <TouchableOpacity onPress={() => this.onSend()}>
                        <IconComponent name={this.props.nickname ? 'btn_save' : 'btn_add_02'} size={40} />
                    </TouchableOpacity>
                </View>
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
    onCopy: PropTypes.func,
};

export default connect(
    state => ({}),
    dispatch => ({
        AddressAction: bindActionCreators(addressActions, dispatch),
    }),
)(AddressBookComponent);
