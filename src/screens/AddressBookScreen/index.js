import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { AddressBookComponent, ToastComponent, LoadComponent } from 'components';
import styles from './styles';

import * as addressBookActions from 'modules/AddressBookReducer';
import * as addressBookApi from 'api/AddressBook/AddressBookApi';

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
        this.focusListener = navigation.addListener('didFocus', payload => {
            this.setState({ addressBookList: [], addressBookLoad: false });
            this.getData();
        });
    }

    componentWillUnmount = () => {
        this.focusListener.remove();
    };

    componentDidUpdate(nextProps, nextState) {
        if (nextProps.txListStore && this.isUpdatedTxList(nextProps.txListStore.list)) {
            this.getData();
        }
    }

    isUpdatedTxList(txList) {
        const { txListStore } = this.props;

        let oldTxList = txListStore.list;

        for (let i = 0; i < txList.length; i++) {
            if (txList[i] !== oldTxList[i]) {
                return true;
            }
        }

        return false;
    }

    async getData() {
        const { txListStore, addressBookStore } = this.props;
        let addressBookList = await addressBookApi.convertTxListToAddressBookList(txListStore.list, addressBookStore.map);
        this.setState({ addressBookList: addressBookList, addressBookLoad: true });
    }

    render() {
        const { navigation } = this.props;
        const { addressBookLoad, addressBookList } = this.state;
        return (
            <>
                <View style={styles.container}>
                    {addressBookList.length > 0 ? (
                        <FlatList
                            data={addressBookList}
                            renderItem={({ item }) => <AddressBookComponent navigation={navigation} toast={this.toast} nickname={item.nickname} address={item.address} />}
                            keyExtractor={(item, index) => index.toString()}
                            removeClippedSubviews={false}
                        />
                    ) : (
                        <LoadComponent isLoad={addressBookLoad} />
                    )}
                </View>
                <ToastComponent
                    ref={ref => {
                        this.toast = ref;
                    }}
                />
            </>
        );
    }
}

AddressBookScreen.proptpes = {
    page: PropTypes.number,
    addressBookLoad: PropTypes.bool,
};

export default connect(
    state => ({
        txListStore: state.TxListReducer,
        addressBookStore: state.AddressBookReducer,
    }),
    dispatch => ({
        addressBookAction: bindActionCreators(addressBookActions, dispatch),
    }),
)(AddressBookScreen);
