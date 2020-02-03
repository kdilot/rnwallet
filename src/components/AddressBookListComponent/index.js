import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, TouchableOpacity, Clipboard } from 'react-native';
import { IconComponent } from 'components';
import PropTypes from 'prop-types';
import S from './styles';

import { deleteAddressBook } from 'api/AddressBook/AddressBookApi';
import { USER_ETH_ADDRESS } from 'constants/Global';
import * as addressActions from 'modules/AddressBookReducer';

class AddressBookListComponent extends Component {
    onCopy = text => {
        const { toast } = this.props;
        const { lang } = this.props.navigation.getScreenProps('locale');
        Clipboard.setString(text);
        toast.showToast(lang.copy);
    };

    onSend = address => {
        const isRoz = true;
        this.props.navigation.navigate('Send', { address, send: true, coin: isRoz ? 'ROZ' : 'ETH' });
    };

    onDelete = async address => {
        const { AddressAction, toast } = this.props;
        const { lang } = this.props.navigation.getScreenProps('locale');

        let addressBookMap = await deleteAddressBook(USER_ETH_ADDRESS, address);
        if (!addressBookMap) {
            return;
        }
        await AddressAction.setAddressBook(addressBookMap);
        toast.showToast(lang.deleteMsg);
    };

    render() {
        const { item } = this.props;
        return (
            <View style={S.ContainerView}>
                <View style={S.TextView}>
                    <Text numberOfLines={1} ellipsizeMode="tail">
                        {item.nickname}
                    </Text>
                </View>
                <View style={S.ButtonGroupView}>
                    <TouchableOpacity
                        style={S.ButtonView}
                        onPress={() => {
                            this.onDelete(item.address);
                        }}>
                        <IconComponent name={'btn_del'} size={34} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={S.ButtonView}
                        onPress={() => {
                            this.onCopy(item.address);
                        }}>
                        <IconComponent name={'btn_copy_02'} size={34} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={S.ButtonView}
                        onPress={() => {
                            this.onSend(item.address);
                        }}>
                        <IconComponent name={'btn_send'} size={34} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

AddressBookListComponent.proptypes = {
    addressBookList: PropTypes.object,
    onActive: PropTypes.func,
};

export default connect(
    state => ({}),
    dispatch => ({
        AddressAction: bindActionCreators(addressActions, dispatch),
    }),
)(AddressBookListComponent);
