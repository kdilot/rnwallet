import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

export default class index extends Component {
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoLayout: {
        flex: 2,
        width: '100%',
        backgroundColor: '#2196F3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentLayout: {
        flex: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});
