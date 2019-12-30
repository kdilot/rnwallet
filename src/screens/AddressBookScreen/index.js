import React, { Component } from 'react';
import { View, FlatList, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import AddressBookComponent from 'components/AddressBookComponent';
import Placeholderlayout from './PlaceholderLayout';
import styles from './styles';

import * as txListActions from 'modules/TxListReducer';
import * as addressBookActions from 'modules/AddressBookReducer';
import * as addressBookApi from 'api/AddressBook/AddressBookApi';
import * as Global from 'constants/Global';

class AddressBookScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            addressBookList: [],
            addressBookLoad: false,
        };
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', (payload) => {
            this.setState({ addressBookLoad: false });
            this.getData();
        });
        this.setAddressBookMap();
    }

    componentWillUnmount = () => {
        this.focusListener.remove();
    };

    async getData() {
        const { txListStore } = this.props;
        let addressBookList = await addressBookApi.convertTxListToAddressBookList(txListStore.list);
        this.setState({ addressBookList: addressBookList, addressBookLoad: true });
    }

    setAddressBookMap() {
        const { addressBookAction } = this.props;

        addressBookApi.getAddressBookMap(Global.USER_ETH_ADDRESS).then((addressBookMap) => {
            if (addressBookMap === {}) {
                return;
            }
            addressBookAction.setAddressBook(addressBookMap);
            this.setState({ addressBookLoad: true });
        });
    }

    render() {
        const { navigation } = this.props;
        const { addressBookLoad, addressBookList } = this.state;
        return (
            <KeyboardAvoidingView style={styles.container}>
                <View style={styles.itemListLayout}>
                    {addressBookLoad ? (
                        <FlatList
                            data={addressBookList}
                            renderItem={({ item }) => <AddressBookComponent navigation={navigation} nickname={item.nickname} address={item.address} />}
                            keyExtractor={(item, index) => index.toString()}
                            onEndReachedThreshold={0.2}
                        />
                    ) : (
                        <Placeholderlayout />
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
    (state) => ({
        txListStore: state.TxListReducer,
        addressStore: state.AddressBookReducer,
    }),
    (dispatch) => ({
        txListAction: bindActionCreators(txListActions, dispatch),
        addressBookAction: bindActionCreators(addressBookActions, dispatch),
    }),
)(AddressBookScreen);
