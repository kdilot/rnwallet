/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressActions from 'modules/AddressBookReducer';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview';
import { dividerLightColor, dividerDarkColor } from 'constants/Color';
import PropTypes from 'prop-types';
import styles from './styles';

class AddressBookComponent extends Component {
    static defaultProps = {
        address: '0x8A52B2a07CE959B54c6dB876CBcb2850A35E37aB',
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

    onSend = () => {
        const { AddressAction, address } = this.props;
        const { nickname } = this.state;
        AddressAction.setAddressBook({ address, nickname });
    };

    render() {
        const { address } = this.props;
        const { nickname } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.addressTextStyle}>{address}</Text>
                <CardView cardElevation={10} cornerRadius={10} style={styles.cardLayout}>
                    <View style={[styles.addressLayout, styles.borderColor(dividerLightColor)]}>
                        <View style={styles.addressTextfield}>
                            <TextInput value={nickname} keyboardType={'default'} onChangeText={text => this.onChange(text)} />
                        </View>
                    </View>
                    <View style={styles.addressButtonLayout}>
                        <TouchableOpacity style={styles.addressButtonGroup}>
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
};

export default connect(
    state => ({
        addressBook: state.AddressBookReducer,
    }),
    dispatch => ({
        AddressAction: bindActionCreators(addressActions, dispatch),
    }),
)(AddressBookComponent);
