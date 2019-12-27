import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import PlaceholderLayout from './PlaceholderLayout';
import PropTypes from 'prop-types';
import styles from './styles';

export default class AddressBookMiniComponent extends Component {
    render() {
        const { onActive, addressBookList } = this.props;
        // const { getHistoryData } = this.props;   //  거래내역 조회 로직
        return (
            <View style={styles.container}>
                <FlatList
                    data={addressBookList.length > 0 ? addressBookList : new Array(5)}
                    ItemSeparatorComponent={() => {
                        return <View style={styles.dividerStyle} />;
                    }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.addressBookTextStyle}
                            onPress={() => {
                                onActive(false);
                                // getHistoryData(item.address);    //  거래내역 조회 로직
                            }}>
                            {addressBookList.length > 0 ? <Text>{item.nickname ? item.nickname : item.address}</Text> : <PlaceholderLayout />}
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

AddressBookMiniComponent.proptypes = {
    addressBookList: PropTypes.object,
    onActive: PropTypes.func,
};
