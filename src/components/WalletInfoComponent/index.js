import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import CardView from 'react-native-cardview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import styles from './styles';

export default class WalletInfoComponent extends Component {
    static defaultProps = {
        logo: 'logo-slack',
        address: '0x8A52B2a07CE959B54c6dB876CBcb2850A35E37aB',
        name: 'Rozeus',
        coin: 'ROZ',
        value: 999,
        navigation: null,
    };

    onReceive = () => {
        const { navigation } = this.props;
        navigation.navigate('QrcodeText');
    };

    render() {
        const { logo, address, name, coin, value } = this.props;
        return (
            <View style={styles.container}>
                <CardView cardElevation={10} cornerRadius={10} style={styles.cardLayout}>
                    <View style={styles.headerLayout}>
                        <Ionicons name="md-refresh" size={35} />
                    </View>
                    <View style={styles.contentAddressLayout}>
                        <Text style={styles.addressTextStyle}>{address}</Text>
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
                            <Text style={styles.listTextStyle}>{`$${value}`}</Text>
                        </View>
                    </View>
                    <View style={styles.footerLayout}>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.onReceive();
                                }}>
                                <Text style={styles.buttonTextStyle}>받기</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity>
                                <Text style={styles.buttonTextStyle}>보내기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </CardView>
            </View>
        );
    }
}

WalletInfoComponent.proptypes = {
    logo: PropTypes.string,
    address: PropTypes.string,
    name: PropTypes.string,
    coin: PropTypes.string,
    value: PropTypes.number,
    navigation: PropTypes.object,
};