import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
                    <FlatList
                        data={MenuList}
                        ItemSeparatorComponent={() => {
                            return <View style={styles.dividerStyle} />;
                        }}
                        ListFooterComponent={() => {
                            return <View style={styles.dividerStyle} />;
                        }}
                        renderItem={({ item }) => (
                            <View style={styles.itemLayout}>
                                <TouchableOpacity onPress={() => this.onClick(item.action)}>
                                    <Text>{lang[item.title]}</Text>
                                    <Ionicons name="md-arrow-forward" style={styles.itemArrowLayout} size={20} />
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        );
    }
}

CustomDrawerScreen.propTypes = {
    MenuList: PropTypes.object,
};
