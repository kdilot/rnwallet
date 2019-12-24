import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressActions from 'modules/AddressBookReducer';
import * as localeActions from 'modules/LocaleReducer';
import { getAddressBookApi } from 'api/AddressBookApi';
import { Text, View } from 'react-native';
import styles from './styles';

class IntroScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addressBookLoad: false,
        };
    }
    componentDidMount() {
        const { AddressAction, LocaleAction } = this.props;

        getAddressBookApi().then(res => {
            //  주소록 가져오기
            if (res) {
                AddressAction.setAddressBook(res);
                this.setState({ addressBookLoad: true });
            } else {
                console.error('ADDRESSBOOK LOAD ERROR');
            }
        });

        LocaleAction.getLocale(); //  언어정보

        setTimeout(() => {
            this.props.navigation.navigate('WalletIntro');
        }, 3000);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>ROZ</Text>
                <Text style={styles.text}>Wallet</Text>
            </View>
        );
    }
}

export default connect(
    state => ({
        addressBook: state.AddressBookReducer,
        locale: state.LocaleReducer,
    }),
    dispatch => ({
        AddressAction: bindActionCreators(addressActions, dispatch),
        LocaleAction: bindActionCreators(localeActions, dispatch),
    }),
)(IntroScreen);
