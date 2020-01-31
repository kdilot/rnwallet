import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as walletActions from 'modules/WalletReducer';
import { Text, View, StatusBar, SafeAreaView } from 'react-native';
import { ButtonComponent } from 'components';
import { rozeusColor } from 'constants/Color';
import { USER_ETH_ADDRESS } from 'constants/Global';
import styles from './styles';
import PropTypes from 'prop-types';

class WalletCheckScreen extends Component {
    componentDidMount() {
        const { navigation } = this.props;
        if (USER_ETH_ADDRESS) {
            navigation.navigate('Home');
        }
    }

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
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={rozeusColor} />
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
            </SafeAreaView>
        );
    }
}

WalletCheckScreen.propTypes = {
    onCreate: PropTypes.func,
};

export default connect(
    state => ({
        walletStore: state.WalletReducer,
    }),
    dispatch => ({
        walletAction: bindActionCreators(walletActions, dispatch),
    }),
)(WalletCheckScreen);
