import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import styles from './styles';

const MenuList = [
    {
        title: 'walletInfo',
        action: 'WalletVersion',
    },
    {
        title: 'notice',
        action: 'Notice',
    },
    {
        title: 'customerService',
        action: 'CustomerService',
    },
    {
        title: 'homepage',
        action: 'Homepage',
    },
];

export default class CustomDrawerScreen extends Component {

    onClick = view => {
        this.props.navigation.navigate(view);
    };

    render() {
        const { lang } = this.props.navigation.getScreenProps('locale');
        return (
            <View style={styles.container}>
                <View style={styles.logoLayout}>
                    <Ionicons name="logo-xbox" size={100} color="white" />
                </View>
                <View style={styles.contentLayout}>
                    {MenuList.map((item, i) => (
                        // eslint-disable-next-line react-native/no-inline-styles
                        <ListItem key={i} title={lang[item.title]} bottomDivider style={{ width: '100%' }} onPress={() => this.onClick(item.action)} chevron />
                    ))}
                </View>
            </View>
        );
    }
}

CustomDrawerScreen.propTypes = {
    MenuList: PropTypes.object,
};
