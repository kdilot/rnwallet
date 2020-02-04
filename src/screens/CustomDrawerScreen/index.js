/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, FlatList, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { IconComponent, Icon } from 'components';
import PropTypes from 'prop-types';
import S from './styles';

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
            <SafeAreaView style={S.ContainerView}>
                <View style={S.LogoView}>
                    <Image source={Icon['menu_logo']} style={{ width: '84%', height: '14%' }} />
                    <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.closeDrawer()} style={S.CloseView}>
                        <IconComponent name={'close'} size={44} />
                    </TouchableOpacity>
                </View>
                <View style={S.ContentView}>
                    <FlatList
                        data={MenuList}
                        renderItem={({ item }) => (
                            <View style={S.ItemView}>
                                <TouchableOpacity onPress={() => this.onClick(item.action)}>
                                    <Text style={{ fontSize: 16 }}>{lang[item.title]}</Text>
                                    <View style={S.ItemArrowView}>
                                        <IconComponent name={'ic_more'} size={34} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

CustomDrawerScreen.propTypes = {
    MenuList: PropTypes.object,
};
