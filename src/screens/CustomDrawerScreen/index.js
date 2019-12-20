import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import styles from './styles';

const MenuList = [
    {
        title: '지갑정보',
        action: '',
    },
    {
        title: '공지사항',
        action: '',
    },
    {
        title: '고객센터',
        action: '',
    },
    {
        title: '홈페이지',
        action: '',
    },
];

export default class CustomDrawerScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoLayout}>
                    <Ionicons name="logo-xbox" size={100} color="white" />
                </View>
                <View style={styles.contentLayout}>
                    {MenuList.map((item, i) => (
                        // eslint-disable-next-line react-native/no-inline-styles
                        <ListItem key={i} title={item.title} bottomDivider style={{ width: '100%' }} chevron />
                    ))}
                </View>
            </View>
        );
    }
}

CustomDrawerScreen.propTypes = {
    MenuList: PropTypes.object,
};
