import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Clipboard } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import S from './styles';

export default class AddressBookListComponent extends Component {
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
                            null;
                        }}>
                        <Feather name="trash" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={S.ButtonView}
                        onPress={() => {
                            this.onCopy(item.address);
                        }}>
                        <Feather name="copy" size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={S.ButtonView}
                        onPress={() => {
                            this.onSend(item.address);
                        }}>
                        <Feather name="send" size={20} />
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
