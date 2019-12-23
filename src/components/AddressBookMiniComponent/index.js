import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressActions from 'modules/AddressBookReducer';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import PlaceholderLayout from './PlaceholderLayout';
import PropTypes from 'prop-types';
import styles from './styles';

class AddressBookMiniComponent extends Component {
    render() {
        const { list } = this.props.addressBook;
        // const { getHistoryData } = this.props;   //  거래내역 조회 로직
        return (
            <View style={styles.container}>
                <FlatList
                    data={list.length > 0 ? list : new Array(5)}
                    ItemSeparatorComponent={() => {
                        return <View style={styles.dividerStyle} />;
                    }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.addressBookTextStyle}
                            onPress={() => {
                                // getHistoryData(item.address);    //  거래내역 조회 로직
                            }}>
                            {list.length > 0 ? <Text>{item.nickname}</Text> : <PlaceholderLayout />}
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

AddressBookMiniComponent.proptypes = {
    list: PropTypes.array,
    getAddressData: PropTypes.func,
};

export default connect(
    state => ({
        addressBook: state.AddressBookReducer,
    }),
    dispatch => ({
        AddressAction: bindActionCreators(addressActions, dispatch),
    }),
)(AddressBookMiniComponent);
