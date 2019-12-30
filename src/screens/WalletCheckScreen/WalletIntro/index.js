import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import ButtonComponent from 'components/ButtonComponent';
import { rozeusColor } from 'constants/Color';
import styles from './styles';

export default class WalletCheckScreen extends Component {
    onCreate = () => {
        const { navigation } = this.props;
        navigation.navigate('WalletCreate');
    };

    onRestore = () => {
        const { navigation } = this.props;
        navigation.navigate('WalletRestore');
    };

    render() {
        const { lang } = this.props.navigation.getScreenProps('locale');
        return (
            <View style={styles.container}>
                <View style={styles.logoLayout}>
                    <Text style={styles.logoTextLayout}>ROZ</Text>
                    <Text style={styles.logoSubTextLayout}>Wallet</Text>
                </View>
                <View style={styles.buttonLayout}>
                    <View style={styles.buttonStyle}>
                        <ButtonComponent name={lang.restore} color={rozeusColor} outline={true} onPress={this.onRestore} />
                    </View>
                    <View style={styles.buttonStyle}>
                        <ButtonComponent name={lang.create} color={rozeusColor} onPress={this.onCreate} />
                    </View>
                </View>
            </View>
        );
    }
}

WalletCheckScreen.propTypes = {
    onCreate: PropTypes.func,
};
