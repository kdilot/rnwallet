import React, { Component } from 'react';
import { Text, View } from 'react-native';
import CardView from 'react-native-cardview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { whiteColor, plusColor, minusColor } from 'constants/Color';
import styles from './styles';

export default class WalletHistoryComponent extends Component {
    static defaultProps = {
        send: true,
        address: '0x8A52B2a07CE959B54c6dB876CBcb2850A35E37aB',
        status: '-',
        date: '-',
        value: '5223',
    };
    render() {
        const { send, address, status, date, value } = this.props;
        return (
            <CardView cardElevation={5} cornerRadius={10} style={styles.cardLayout}>
                <View style={styles.contentLayout}>
                    <View style={styles.contentIconLayout}>
                        <View style={[styles.contentIconStyle, styles.IconColor(send ? plusColor : minusColor)]}>
                            <Ionicons name={`md-arrow-round-${send ? 'up' : 'down'}`} size={50} color={whiteColor} />
                        </View>
                    </View>
                    <View style={styles.contentTextLayout}>
                        <View style={styles.contentTextFirstLine}>
                            <Text>{address}</Text>
                        </View>
                        <View style={[styles.contentTextSecondLine]}>
                            <Text style={styles.TextColor(send ? plusColor : minusColor)}>{send ? 'Sent' : 'Receive'}</Text>
                            <Text>{`$${value}`}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.footerLayout}>
                    <Text style={styles.footerTextStyle}>{status}</Text>
                    <Text style={styles.footerTextStyle}>{date}</Text>
                </View>
            </CardView>
        );
    }
}
