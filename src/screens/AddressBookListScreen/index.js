import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AddressBookListComponent, ToastComponent, LoadComponent, IconComponent } from 'components';
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

    componentDidUpdate(prevProps, prevState) {
        // detect realtime txList change
        if (prevProps.txListStore && prevProps.txListStore.list !== this.props.txListStore.list) {
            this.getData();
        }

        // detect realtime addressBookMap change
        if (prevProps.addressBookStore && prevProps.addressBookStore.map !== this.props.addressBookStore.map) {
            this.getData();
        }
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
            <SafeAreaView style={S.ContainerView}>
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
                    <TouchableOpacity style={S.AddBtnView} onPress={() => navigation.navigate('AddressBook')} activeOpacity={0.8}>
                        <IconComponent name={'btn_add'} size={68} />
                    </TouchableOpacity>
                </View>
                <ToastComponent
                    ref={ref => {
                        this.toast = ref;
                    }}
                />
            </SafeAreaView>
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
