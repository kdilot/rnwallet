import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressActions from 'modules/AddressBookReducer';
import { getAddressBookApi } from 'api/AddressBookApi';
import { View, FlatList, KeyboardAvoidingView, Text } from 'react-native';
import AddressBookComponent from 'components/AddressBookComponent';
import PropTypes from 'prop-types';
import styles from './styles';

class AddressBookScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            addressBookLoad: false,
        };
    }

    componentDidMount() {
        const { navigation, AddressAction } = this.props;
        this.focusListener = navigation.addListener('didFocus', payload => {
            getAddressBookApi().then(res => {
                //  주소록 가져오기
                if (res.data) {
                    AddressAction.setAddressBook(res.data);
                    this.setState({ addressBookLoad: true });
                } else {
                    console.error('ADDRESSBOOK LOAD ERROR');
                }
            });
        });
    }

    render() {
        const { list } = this.props.addressBook;
        const { navigation } = this.props;
        const { addressBookLoad } = this.state;
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.itemListLayout}>
                    {addressBookLoad ? (
                        <FlatList
                            data={list}
                            renderItem={({ item }) => <AddressBookComponent navigation={navigation} nickname={item.nickname} address={item.address} />}
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
    addressBookLoad: PropTypes.bool,
};

export default connect(
    state => ({
        addressBook: state.AddressBookReducer,
    }),
    dispatch => ({
        AddressAction: bindActionCreators(addressActions, dispatch),
    }),
)(AddressBookScreen);
