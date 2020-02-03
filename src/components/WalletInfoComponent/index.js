import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { IconComponent, Icon } from 'components';
import PropTypes from 'prop-types';
import S from './styles';

const WIDTH = Dimensions.get('window').width;

export default class WalletInfoComponent extends Component {
    static defaultProps = {
        icon: 'roz',
        name: 'Rozeus',
        coin: 'ROZ',
        value: 999,
        navigation: null,
    };

    onReceive = () => {
        const { navigation } = this.props;
        navigation.navigate('QrcodeText');
    };

    onSend = () => {
        const { navigation, coin } = this.props;
        navigation.navigate('Send', { coin });
    };

    render() {
        const { icon, name, coin, value, navigation, refresh, isLoad } = this.props;
        const { lang } = navigation.getScreenProps('locale');
        return (
            <View style={S.ContainerView}>
                <ImageBackground source={Icon[coin === 'ROZ' ? 'roz_card' : 'eth_card']} style={{ width: WIDTH, height: WIDTH }}>
                    <View style={S.CardView}>
                        <View style={S.HeaderView}>
                            <View style={S.TextHeaderView}>
                                <View style={S.TextHeaderGroup}>
                                    <Text style={S.TextHeaderText}>{name}</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => {
                                        refresh();
                                    }}>
                                    <IconComponent name={'btn_refresh'} size={40} />
                                </TouchableOpacity>
                            </View>
                            <View style={S.ContentView}>
                                <View style={S.ContentIconView}>
                                    <IconComponent name={`ic_${icon}`} size={28} />
                                    <Text style={S.ContentIconText}>{coin}</Text>
                                </View>
                            </View>
                            <View style={S.ContentView}>
                                <Text style={S.ContentCoinText}>{isLoad ? value : 'Loading...'}</Text>
                            </View>
                        </View>
                        <View style={S.FooterView}>
                            <TouchableOpacity
                                style={[S.ButtonGroupView, S.ButtonLine]}
                                onPress={() => {
                                    this.onReceive();
                                }}>
                                <Text style={S.ButtonText}>{lang.receive}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={S.ButtonGroupView}
                                onPress={() => {
                                    this.onSend();
                                }}>
                                <Text style={S.ButtonText}>{lang.send}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

WalletInfoComponent.proptypes = {
    icon: PropTypes.string,
    name: PropTypes.string,
    coin: PropTypes.string,
    value: PropTypes.number,
    onReceive: PropTypes.func,
    onSend: PropTypes.func,
    refresh: PropTypes.func,
    navigation: PropTypes.object,
};
