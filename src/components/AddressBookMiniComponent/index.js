import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { IconComponent } from 'components';
import PropTypes from 'prop-types';
import S from './styles';

export default class AddressBookMiniComponent extends Component {
    render() {
        const { onActive, addressBookList } = this.props;
        const list = addressBookList.filter(f => f.nickname);
        return (
            <View style={S.ContainerView}>
                {list.length > 0 ? (
                    <FlatList
                        data={list}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={S.ListView}
                                onPress={() => {
                                    onActive(item.address);
                                }}>
                                <View style={S.ListGroupView}>
                                    <View style={S.ListTextView}>
                                        <Text numberOfLines={1} ellipsizeMode="middle">
                                            {item.nickname ? item.nickname : item.address}
                                        </Text>
                                    </View>
                                    <View style={S.ListIconView}>
                                        <IconComponent name={'btn_send'} size={34} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <View style={S.IsEmptyView}>
                        <Text>No Data</Text>
                    </View>
                )}
            </View>
        );
    }
}

AddressBookMiniComponent.proptypes = {
    addressBookList: PropTypes.object,
    onActive: PropTypes.func,
};
