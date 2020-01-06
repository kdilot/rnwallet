import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PlaceholderLayout from './PlaceholderLayout';
import { USER_ETH_ADDRESS } from 'constants/Global';
import PropTypes from 'prop-types';
import styles from './styles';

export default class WalletInfoComponent extends Component {
    static defaultProps = {
        logo: 'logo-slack',
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
        const { logo, name, coin, value, navigation, refresh, isLoad } = this.props;
        const { lang } = navigation.getScreenProps('locale');
        return (
            <View style={styles.container}>
                <CardView cardElevation={10} cornerRadius={10} style={styles.cardLayout(isLoad)}>
                    {isLoad ? (
                        <>
                            <View style={styles.headerLayout}>
                                <TouchableOpacity
                                    onPress={() => {
                                        refresh();
                                    }}>
                                    <Ionicons name="md-refresh" size={35} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.contentAddressLayout}>
                                <Text style={styles.addressTextStyle}>{USER_ETH_ADDRESS}</Text>
                            </View>
                            <View style={styles.contentLayout}>
                                <View style={styles.contentIconStyle}>
                                    <Ionicons name={logo} size={45} />
                                </View>
                                <View style={styles.contentTextGroup}>
                                    <Text style={styles.listTextStyle}>{name}</Text>
                                    <Text style={styles.listTextSubStyle}>{coin}</Text>
                                </View>
                                <View style={[styles.contentTextGroup, styles.alignRight]}>
                                    <Text style={styles.listTextStyle}>
                                        {value} {coin === 'ETH' ? 'ETH' : 'ROZ'}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.footerLayout}>
                                <TouchableOpacity
                                    style={styles.buttonGroup}
                                    onPress={() => {
                                        this.onReceive();
                                    }}>
                                    <Text style={styles.buttonTextStyle}>{lang.receive}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.buttonGroup}
                                    onPress={() => {
                                        this.onSend();
                                    }}>
                                    <Text style={styles.buttonTextStyle}>{lang.send}</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        <PlaceholderLayout />
                    )}
                </CardView>
            </View>
        );
    }
}

WalletInfoComponent.proptypes = {
    logo: PropTypes.string,
    name: PropTypes.string,
    coin: PropTypes.string,
    value: PropTypes.number,
    onReceive: PropTypes.func,
    onSend: PropTypes.func,
    refresh: PropTypes.func,
    navigation: PropTypes.object,
};
