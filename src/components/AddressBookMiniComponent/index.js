// /* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressActions from 'modules/AddressBookReducer';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import { dividerLightColor, dividerDarkColor } from 'constants/Color';
import PropTypes from 'prop-types';
import styles from './styles';

class AddressBookMiniComponent extends Component {
    render() {
        const { list } = this.props.addressBook;
        const { getAddressData } = this.props;
        return (
            <View style={styles.container}>
                {list.length > 0 ? (
                    <FlatList
                        data={list}
                        ItemSeparatorComponent={() => {
                            return <View style={styles.dividerStyle} />;
                        }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.addressBookTextStyle}
                                onPress={() => {
                                    getAddressData(item.address);
                                }}>
                                <Text>{item.nickname}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                ) : (
                    <Text>No data</Text>
                )}
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
