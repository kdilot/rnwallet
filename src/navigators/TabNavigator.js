import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LocaleScreen from 'components/Locale';
import QrcodeTextScreen from 'screens/QrcodeScreen/QrcodeText';
// import QrcodeScannerScreen from 'screens/QrcodeScreen/QrcodeScanner';
import WalletCheckScreen from 'screens/WalletCheckScreen/WalletIntro';
import SettingScreen from 'screens/SettingScreen';
import CustomSidebarMenu from 'screens/CustomDrawerScreen';

const BottomMenuTab = createMaterialTopTabNavigator(
    {
        Home: {
            screen: LocaleScreen,
            navigationOptions: {
                headerLeft: <Ionicons name="home" size={15} color="blue" />,
                tabBarIcon: ({ focused, tintColor }) => <Ionicons name="md-home" size={35} color={focused ? 'white' : 'white'} />,
            },
        },
        History: {
            screen: QrcodeTextScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => <Ionicons name="md-list-box" size={35} color={focused ? 'white' : 'white'} />,
            },
        },
        Contact: {
            screen: WalletCheckScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => <Ionicons name="md-contact" size={35} color={focused ? 'white' : 'white'} />,
            },
        },
        Setting: {
            screen: SettingScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => <Ionicons name="md-settings" size={35} color={focused ? 'white' : 'white'} />,
            },
        },
    },
    {
        animationEnabled: true,
        swipeEnabled: true,
        tabBarPosition: 'bottom',
        initialRouteName: 'Home',
        tabBarOptions: {
            tabStyle: {
                margin: 6,
            },
            iconStyle: {
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            },
            showIcon: true,
            showLabel: false,
            indicatorStyle: {
                borderBottomColor: 'blue',
                borderBottomWidth: 2,
            },
        },
    },
);

const BottomStack = createStackNavigator(
    {
        Home: {
            screen: BottomMenuTab,
        },
    },
    {
        initialRouteName: 'Home',
        headerLayoutPreset: 'center',
    },
);

BottomMenuTab.navigationOptions = ({ navigation }) => ({
    title: 'ROZ',
    headerStyle: {
        backgroundColor: '#2196F3',
    },
    headerTintColor: '#FFFFFF',
    headerLeft: (
        <TouchableOpacity
            onPress={() => {
                navigation.openDrawer();
            }}>
            <Ionicons name="md-menu" size={30} color={'white'} />
        </TouchableOpacity>
    ),
    headerLeftContainerStyle: { marginLeft: 20 },
});

const MainNavigator = createDrawerNavigator(
    {
        BottomMenu: {
            screen: BottomStack,
        },
    },
    {
        drawerType: 'slide',
        contentComponent: CustomSidebarMenu,
    },
);

export default createAppContainer(MainNavigator);
