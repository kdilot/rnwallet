import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import QrcodeTextScreen from 'screens/QrcodeScreen/QrcodeText';
import QrcodeScannerScreen from 'screens/QrcodeScreen/QrcodeScanner';
import MainScreen from 'screens/MainScreen';
import WalletHistoryScreen from 'screens/WalletHistoryScreen';
import AddressBookScreen from 'screens/AddressBookScreen';
import SendScreen from 'screens/SendScreen';
import SettingScreen from 'screens/SettingScreen';
import NoticeScreen from 'screens/NoticeScreen';
import CustomSidebarMenu from 'screens/CustomDrawerScreen';
import LoginAuthNavigator from 'screens/LoginAuthScreen/LoginAuthNavigator';
import { basicColor } from 'constants/Color';

const BottomMenuTab = createMaterialTopTabNavigator(
    {
        Home: {
            screen: MainScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => <Ionicons name="md-home" size={35} color={focused ? 'white' : 'white'} />,
            },
        },
        WalletHistory: {
            screen: WalletHistoryScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => <Ionicons name="md-list-box" size={35} color={focused ? 'white' : 'white'} />,
            },
        },
        AddressBook: {
            screen: AddressBookScreen,
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
                borderBottomColor: basicColor,
                borderBottomWidth: 2,
            },
        },
    },
);

BottomMenuTab.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title') || 'ROZ',
    headerStyle: {
        backgroundColor: basicColor,
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

const BottomStack = createStackNavigator(
    {
        Home: {
            screen: BottomMenuTab,
        },
        Notice: {
            screen: NoticeScreen,
            navigationOptions: {
                headerTitle: '공지사항',
            },
        },
        Send: {
            screen: SendScreen,
            navigationOptions: {
                headerTitle: '보내기',
            },
        },
        QrcodeText: {
            screen: QrcodeTextScreen,
            navigationOptions: {
                headerTitle: '받기',
            },
        },
        QrcodeScanner: {
            screen: QrcodeScannerScreen,
            navigationOptions: {
                headerTitle: '주소스캔',
            },
        },
        LoginAuth: {
            screen: LoginAuthNavigator,
            navigationOptions: {
                header: null,
            },
        },
    },
    {
        initialRouteName: 'Home',
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: basicColor,
            },
            headerTintColor: '#FFFFFF',
        },
    },
);

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
