import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressActions from 'modules/AddressBookReducer';
import { Text, View } from 'react-native';
import styles from './styles';

class IntroScreen extends Component {
    componentDidMount() {
        const { AddressAction } = this.props;
        AddressAction.getAddressBook(); //  주소록 가져오기

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

export default connect(dispatch => ({
    AddressAction: bindActionCreators(addressActions, dispatch),
}))(IntroScreen);
