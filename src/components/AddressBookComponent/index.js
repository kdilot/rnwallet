/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressActions from 'modules/AddressBookReducer';
import { setAddressBookApi } from 'api/AddressBook/AddressBookApi';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview';
import { dividerLightColor, dividerDarkColor } from 'constants/Color';
import Toast from 'react-native-root-toast';
import PropTypes from 'prop-types';
import styles from './styles';

class AddressBookComponent extends Component {
    static defaultProps = {
        address: '---------------',
        nickname: '테스트',
    };

    constructor(props) {
        super(props);

        this.state = {
            nickname: props.nickname,
        };
    }

    onChange = text => {
        this.setState({ nickname: text });
    };

    onSend = async () => {
        const { AddressAction, address } = this.props;
        const { nickname } = this.state;

        await setAddressBookApi({ address, nickname }).then(res => {
            if (res.data) {
                Toast.show('저장성공', { duration: Toast.durations.SHORT, position: 50 });
                AddressAction.setAddressBook(res.data);
            } else {
                console.error('ADDRESSBOOK LOAD ERROR');
            }
        });
    };

    onHistory = () => {
        const { address } = this.props;
        this.props.navigation.navigate('WalletHistory', { itemType: 3, address });
    };

    render() {
        const { address } = this.props;
        const { nickname } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.addressTextStyle}>{address}</Text>
                <CardView cardElevation={5} cornerRadius={10} style={styles.cardLayout}>
                    <View style={[styles.addressLayout, styles.borderColor(dividerLightColor)]}>
                        <View style={styles.addressTextfield}>
                            <TextInput value={nickname} keyboardType={'default'} onChangeText={text => this.onChange(text)} />
                        </View>
                    </View>
                    <View style={styles.addressButtonLayout}>
                        <TouchableOpacity style={styles.addressButtonGroup} onPress={() => this.onHistory()}>
                            <Text style={[styles.addressButtonTextStlye, styles.TextColor(dividerDarkColor)]}>거래내역</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addressButtonGroup} onPress={() => this.onSend()}>
                            <Text style={[styles.addressButtonTextStlye, styles.TextColor(dividerDarkColor), { textAlign: 'right' }]}>저장</Text>
                        </TouchableOpacity>
                    </View>
                </CardView>
            </View>
        );
    }
}

AddressBookComponent.proptypes = {
    address: PropTypes.string,
    nickname: PropTypes.string,
    onChange: PropTypes.func,
    onSend: PropTypes.func,
    onHistory: PropTypes.func,
};

export default connect(
    state => ({
        addressBook: state.AddressBookReducer,
    }),
    dispatch => ({
        AddressAction: bindActionCreators(addressActions, dispatch),
    }),
)(AddressBookComponent);
