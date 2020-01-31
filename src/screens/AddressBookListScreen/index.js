import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastComponent, AddressBookListComponent, LoadComponent } from 'components';
import * as addressBookActions from 'modules/AddressBookReducer';
import * as addressBookApi from 'api/AddressBook/AddressBookApi';
import S from './styles';
import PropTypes from 'prop-types';

class AddressBookListScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
        const { addressBookList, addressBookLoad } = this.state;
        const list = addressBookList.filter(f => f.nickname);
        return (
            <View style={S.ContainerView}>
                {list.length > 0 ? (
                    <FlatList
                        data={list}
                        renderItem={({ item }) => {
                            return item.nickname && <AddressBookListComponent navigation={navigation} toast={this.toast} item={item} />;
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        removeClippedSubviews={false}
                    />
                ) : (
                    <LoadComponent isLoad={addressBookLoad} />
                )}

                <View style={S.AbsoluteView}>
                    <TouchableOpacity style={S.AddBtnView} onPress={() => navigation.navigate('AddressBook')}>
                        <Text style={S.AddBtnIconView}>+</Text>
                    </TouchableOpacity>
                </View>
                <ToastComponent
                    ref={ref => {
                        this.toast = ref;
                    }}
                />
            </View>
        );
    }
}

AddressBookListScreen.proptpes = {
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
)(AddressBookListScreen);
