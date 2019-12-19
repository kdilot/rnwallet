import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DrawerNavigator from 'navigators/DrawerNavigator';
import LocaleScreen from 'components/Locale';
import QrcodeTextScreen from 'screens/QrcodeScreen/QrcodeText';
import SettingScreen from 'screens/SettingScreen';
// QrcodeText
const BottomMenuNavigator = createMaterialTopTabNavigator(
    {
        Home: {
            screen: LocaleScreen,
            navigationOptions: {
                headerLeft: <Ionicons name="home" size={15} color="blue" />,
                tabBarIcon: ({ focused, tintColor }) => <Ionicons name="md-home" size={25} color={focused ? 'white' : 'white'} />,
                // tabBarIcon: ({ focused, tintColor }) => <Ionicons name="md-home" size={25} color={focused ? ActiveColor : 'white'} />,
            },
        },
        test: {
            screen: QrcodeTextScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => <Ionicons name="md-list-box" size={25} color={focused ? 'white' : 'white'} />,
            },
        },
        contact: {
            screen: LocaleScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => <Ionicons name="md-contact" size={25} color={focused ? 'white' : 'white'} />,
            },
        },
        setting: {
            screen: SettingScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => <Ionicons name="md-settings" size={25} color={focused ? 'white' : 'white'} />,
            },
        },
    },
    {
        animationEnabled: true,
        swipeEnabled: true,
        tabBarPosition: 'bottom',
        initialRouteName: 'Home',
        tabBarOptions: {
            showIcon: true,
            showLabel: false,
            indicatorStyle: {
                borderBottomColor: 'blue',
                borderBottomWidth: 2,
            },
        },
    },
);

BottomMenuNavigator.navigationOptions = ({ navigation }) => ({
    title: 'ROZ',
    headerStyle: {
        backgroundColor: '#2196F3',
    },
    headerTintColor: '#FFFFFF',
    headerLeft: (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('DrawerMenu');
            }}>
            <Ionicons name="md-menu" size={30} color={'white'} />
        </TouchableOpacity>
    ),
    headerLeftContainerStyle: { marginLeft: 20 },
});

const MainNavigator = createStackNavigator(
    {
        BottomMenu: {
            screen: BottomMenuNavigator,
        },
        DrawerMenu: {
            screen: DrawerNavigator,
        },
    },
    {
        headerLayoutPreset: 'center',
    },
);

export default createAppContainer(MainNavigator);
