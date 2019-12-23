import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressActions from 'modules/AddressBookReducer';
import { View, FlatList, KeyboardAvoidingView, Text } from 'react-native';
import AddressBookComponent from 'components/AddressBookComponent';
import PropTypes from 'prop-types';
import styles from './styles';
import sampleData from './sampleData.json';

class AddressBookScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            data: sampleData,
        };
    }

    render() {
        const { list } = this.props.addressBook;
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.itemListLayout}>
                    {list.length > 0 ? (
                        <FlatList
                            data={list}
                            renderItem={({ item }) => <AddressBookComponent nickname={item.nickname} address={item.address} />}
                            keyExtractor={(item, index) => index.toString()}
                            // refreshing={refreshing}
                            // onRefresh={() => {
                            //     this.onRefresh();
                            // }}
                            // onEndReached={() => {
                            //     this.getData(page);
                            // }}
                            onEndReachedThreshold={0.2}
                        />
                    ) : (
                        <Text>No data</Text>
                    )}
                </View>
            </KeyboardAvoidingView>
        );
    }
}

AddressBookScreen.proptpes = {
    page: PropTypes.number,
    data: PropTypes.array,
};

export default connect(
    state => ({
        addressBook: state.AddressBookReducer,
    }),
    dispatch => ({
        AddressAction: bindActionCreators(addressActions, dispatch),
    }),
)(AddressBookScreen);
