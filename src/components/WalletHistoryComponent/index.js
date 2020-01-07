/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressActions from 'modules/AddressBookReducer';
import { setAddressBookApi } from 'api/AddressBook/AddressBookApi';
import { Text, View, TouchableOpacity, Clipboard } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import CardView from 'react-native-cardview';
import { plusColor, minusColor, successColor, failColor, dividerDarkColor } from 'constants/Color';
import Icon from 'components/IconComponent';
import Toast from 'react-native-root-toast';
import PropTypes from 'prop-types';
import styles from './styles';

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
        };
    }

    onChange = text => {
        this.setState({ name: text });
    };

    onSend = address => {
        this.props.navigation.navigate('Send', { address, send: true });
    };

    addAddressBook = async () => {
        const { AddressAction } = this.props;
        const { lang } = this.props.navigation.getScreenProps('locale');
        const { name, to } = this.state;
        await setAddressBookApi({ address: to, nickname: name }).then(addressBookMap => {
            if (!addressBookMap || addressBookMap === {}) {
                return;
            }

            Toast.show(lang.saveMsg, { duration: Toast.durations.SHORT, position: 50 });
            AddressAction.setAddressBook(addressBookMap);
        });
    };

    onCopy = text => {
        const { toast } = this.props;
        const { lang } = this.props.navigation.getScreenProps('locale');
        Clipboard.setString(text);
        toast.showToast(lang.copy);
    };

    render() {
        const { time, value, status, send, from, to, isRoz, hash } = this.props.data;
        const { lang } = this.props.navigation.getScreenProps('locale');
        const { name } = this.state;
        return (
            <CardView cardElevation={5} cornerRadius={2} style={styles.cardLayout}>
                <View style={[styles.addressLayout, styles.borderColor(dividerDarkColor)]}>
                    <Text numberOfLines={1}>{name}</Text>
                    <TouchableOpacity style={styles.addressButtonGroup} onPress={() => this.onSend(send ? to : from)}>
                        <Feather name="send" size={20} />
                    </TouchableOpacity>
                </View>
                <View style={styles.timeLayout}>
                    <Text style={styles.timeTextStyle}>{time}</Text>
                </View>
                <View style={styles.contentLayout}>
                    <View style={styles.contentHeaderLayout}>
                        <View style={styles.headerIconLayout}>
                            <Icon name={isRoz ? 'roz' : 'eth'} size={40} />
                        </View>
                        <View style={styles.headerTextLayout}>
                            <View style={[styles.headerTextGroup]}>
                                <Text style={styles.BoxTextColor(send ? minusColor : plusColor, 1)}>{send ? lang.sentBtn : lang.receiveBtn}</Text>
                                <Text style={[styles.contentTextStyle, styles.alignRight, { fontWeight: 'bold' }]}>{`${value} ${isRoz ? 'ROZ' : 'ETH'}`}</Text>
                            </View>
                            <View style={[styles.headerTextGroup]}>
                                <Text style={styles.BoxTextColor(status ? successColor : failColor, 0.6)}>{status ? lang.success : lang.fail}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.contentAddressGroup}>
                        <View>
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
                        {/* <View>
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
                        </View> */}
                    </View>
                </View>
            </CardView>
        );
    }
}

WalletHistoryComponent.proptypes = {
    data: PropTypes.number,
    onChange: PropTypes.func,
    onSend: PropTypes.func,
    onCopy: PropTypes.func,
    addAddressBook: PropTypes.func,
};

export default connect(
    state => ({
        addressBookStore: state.AddressBookReducer,
    }),
    dispatch => ({
        AddressAction: bindActionCreators(addressActions, dispatch),
    }),
)(WalletHistoryComponent);
