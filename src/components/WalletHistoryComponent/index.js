/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as addressActions from 'modules/AddressBookReducer';
import { Text, View, TouchableOpacity, Clipboard, Image } from 'react-native';
import { IconComponent, Icon } from 'components';
import PropTypes from 'prop-types';
import S from './styles';

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
            <View style={S.ContainerView}>
                <View style={S.AddressView}>
                    <Text style={S.AddressText} numberOfLines={1}>
                        {name}
                    </Text>
                    <TouchableOpacity style={S.AddressButton} onPress={() => this.onSend(send ? to : from)}>
                        <IconComponent name={'btn_send'} size={34} />
                    </TouchableOpacity>
                </View>
                <View style={S.InfoView}>
                    <View style={S.InfoIconView}>
                        <IconComponent name={isRoz ? 'roz' : 'eth'} size={30} />
                    </View>
                    <View style={S.InfoTextView}>
                        <View style={S.InfoTextGroupView}>
                            {send >= 0 && <Text style={[S.InfoText, S.InfoTextColor(send ? '#fb8325' : '#545aef')]}>{send ? lang.sentBtn : lang.receiveBtn}</Text>}
                            <Text style={S.InfoTimeText}>{time}</Text>
                        </View>
                        <View style={S.InfoTextGroupView}>
                            {send >= 0 && (
                                <Text style={[S.InfoText, S.InfoTextColor(status === STATUS_SUCCESS ? '#459f11' : status === STATUS_PENDING ? '#646464' : '#cc1515')]}>
                                    {status === STATUS_SUCCESS ? lang.success : status === STATUS_PENDING ? 'Pending' : lang.fail}
                                </Text>
                            )}
                            <Text style={S.InfoValueText}>{`${value} ${isRoz ? 'ROZ' : 'ETH'}`}</Text>
                        </View>
                    </View>
                </View>
                {isView && (
                    <View style={S.MoreView}>
                        <View style={S.MoreItemView}>
                            <View style={S.MoreItemImage}>
                                <Image source={Icon['img_hash']} style={{ width: 34, height: 16 }} />
                            </View>
                            <Text style={S.MoreItemText} numberOfLines={1} ellipsizeMode="middle">
                                {hash}
                            </Text>
                            <View style={S.MoreItemButton}>
                                <TouchableOpacity
                                    style={{ alignItems: 'flex-end' }}
                                    onPress={() => {
                                        this.onCopy(hash);
                                    }}>
                                    <IconComponent name={'btn_copy_02'} size={30} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={S.MoreItemView}>
                            <View style={S.MoreItemImage}>
                                <Image source={Icon['img_from']} style={{ width: 34, height: 16 }} />
                            </View>
                            <Text style={S.MoreItemText} numberOfLines={1} ellipsizeMode="middle">
                                {from}
                            </Text>
                            <View style={S.MoreItemButton}>
                                <TouchableOpacity
                                    style={{ alignItems: 'flex-end' }}
                                    onPress={() => {
                                        this.onCopy(from);
                                    }}>
                                    <IconComponent name={'btn_copy_02'} size={30} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={S.MoreItemView}>
                            <View style={S.MoreItemImage}>
                                <Image source={Icon['img_to']} style={{ width: 34, height: 16 }} />
                            </View>
                            <Text style={S.MoreItemText} numberOfLines={1} ellipsizeMode="middle">
                                {to}
                            </Text>
                            <View style={S.MoreItemButton}>
                                <TouchableOpacity
                                    style={{ alignItems: 'flex-end' }}
                                    onPress={() => {
                                        this.onCopy(to);
                                    }}>
                                    <IconComponent name={'btn_copy_02'} size={30} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                <View style={S.MoreBtnView}>
                    <TouchableOpacity onPress={() => this.onView()}>
                        <IconComponent name={isView ? 'ic_hidden' : 'ic_open'} size={30} />
                    </TouchableOpacity>
                </View>
            </View>
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
