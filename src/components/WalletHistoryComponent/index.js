/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressActions from 'modules/AddressBookReducer';
import { Text, View, TouchableOpacity, Clipboard } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CardView from 'react-native-cardview';
import { plusColor, minusColor, successColor, failColor, dividerDarkColor } from 'constants/Color';
import { IconComponent } from 'components';
import PropTypes from 'prop-types';
import styles from './styles';

const STATUS_SUCCESS = 1;
const STATUS_PENDING = 2;

class WalletHistoryComponent extends Component {
    static defaultProps = {
        data: [],
    };

    constructor(props) {
        super(props);

        this.state = {
            name: props.data.nickname ? props.data.nickname : props.data.send ? props.data.to : props.data.from,
            address: props.data.send ? props.data.from : props.data.to, //  본인주소
            to: props.data.to,
            isView: false,
        };
    }

    onChange = text => {
        this.setState({ name: text });
    };

    onSend = address => {
        const { isRoz } = this.props.data;
        this.props.navigation.navigate('Send', { address, send: true, coin: isRoz ? 'ROZ' : 'ETH' });
    };

    onCopy = text => {
        const { toast } = this.props;
        const { lang } = this.props.navigation.getScreenProps('locale');
        Clipboard.setString(text);
        toast.showToast(lang.copy);
    };

    onView = () => {
        const { isView } = this.state;
        this.setState({ isView: !isView });
    };

    render() {
        const { time, value, status, send, from, to, isRoz, hash } = this.props.data;
        const { lang } = this.props.navigation.getScreenProps('locale');
        const { name, isView } = this.state;
        return (
            <CardView cardElevation={5} cornerRadius={2} style={styles.cardLayout}>
                <View style={[styles.addressLayout, styles.borderColor(dividerDarkColor)]}>
                    <Text numberOfLines={1}>{name}</Text>
                    {name && (
                        <TouchableOpacity style={styles.addressButtonGroup} onPress={() => this.onSend(send ? to : from)}>
                            <Feather name="send" size={20} />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.timeLayout}>
                    <Text style={styles.timeTextStyle}>{time}</Text>
                </View>
                <View style={styles.contentLayout}>
                    <View style={styles.contentHeaderLayout}>
                        <View style={styles.headerIconLayout}>
                            <IconComponent name={isRoz ? 'roz' : 'eth'} size={40} />
                        </View>
                        <View style={styles.headerTextLayout}>
                            <View style={[styles.headerTextGroup]}>
                                {send >= 0 && <Text style={styles.BoxTextColor(send ? minusColor : plusColor, 1)}>{send ? lang.sentBtn : lang.receiveBtn}</Text>}
                                {value >= 0 && <Text style={[styles.contentTextStyle, styles.alignRight, { fontWeight: 'bold' }]}>{`${value} ${isRoz ? 'ROZ' : 'ETH'}`}</Text>}
                            </View>
                            <View style={[styles.headerTextGroup]}>
                                <Text style={styles.BoxTextColor(status === STATUS_SUCCESS ? successColor : status === STATUS_PENDING ? '#a63393' : failColor, 0.6)}>
                                    {status === STATUS_SUCCESS ? lang.success : status === STATUS_PENDING ? 'Pending' : lang.fail}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.contentAddressGroup}>
                        <TouchableOpacity onPress={() => this.onView()}>
                            <Feather name={isView ? 'minus-square' : 'plus-square'} size={20} />
                        </TouchableOpacity>
                        {isView && (
                            <>
                                <View style={styles.contentAddressListLayout}>
                                    <Text style={styles.contentAddressTitle}>Hash</Text>
                                    <View style={styles.contentTextGroup}>
                                        <Text style={{ flex: 7 }} numberOfLines={1} ellipsizeMode="middle">
                                            {hash}
                                        </Text>
                                        <View style={[styles.alignRight, { flex: 1 }]}>
                                            <TouchableOpacity
                                                style={{ alignItems: 'flex-end' }}
                                                onPress={() => {
                                                    this.onCopy(hash);
                                                }}>
                                                <Feather name="copy" size={20} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.contentAddressTitle}>From</Text>
                                    <View style={styles.contentTextGroup}>
                                        <Text style={{ flex: 7 }} numberOfLines={1} ellipsizeMode="middle">
                                            {from}
                                        </Text>
                                        <View style={[styles.alignRight, { flex: 1 }]}>
                                            <TouchableOpacity
                                                style={{ alignItems: 'flex-end' }}
                                                onPress={() => {
                                                    this.onCopy(from);
                                                }}>
                                                <Feather name="copy" size={20} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <Text style={styles.contentAddressTitle}>To</Text>
                                    <View style={styles.contentTextGroup}>
                                        <Text style={{ flex: 7 }} numberOfLines={1} ellipsizeMode="middle">
                                            {to}
                                        </Text>
                                        <View style={[styles.alignRight, { flex: 1 }]}>
                                            <TouchableOpacity
                                                style={{ alignItems: 'flex-end' }}
                                                onPress={() => {
                                                    this.onCopy(to);
                                                }}>
                                                <Feather name="copy" size={20} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </>
                        )}
                    </View>
                </View>
            </CardView>
        );
    }
}

WalletHistoryComponent.proptypes = {
    data: PropTypes.number,
    name: PropTypes.string,
    address: PropTypes.string,
    to: PropTypes.string,
    isView: PropTypes.bool,
    onChange: PropTypes.func,
    onSend: PropTypes.func,
    onCopy: PropTypes.func,
    onView: PropTypes.func,
};

export default connect(
    state => ({
        addressBookStore: state.AddressBookReducer,
    }),
    dispatch => ({
        AddressAction: bindActionCreators(addressActions, dispatch),
    }),
)(WalletHistoryComponent);
