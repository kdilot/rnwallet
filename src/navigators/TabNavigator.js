import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/Feather';
import QrcodeTextScreen from 'screens/QrcodeScreen/QrcodeText';
import QrcodeScannerScreen from 'screens/QrcodeScreen/QrcodeScanner';
import MainScreen from 'screens/MainScreen';
import WalletHistoryScreen from 'screens/WalletHistoryScreen';
import AddressBookScreen from 'screens/AddressBookScreen';
import SendScreen from 'screens/SendScreen';
import SettingScreen from 'screens/SettingScreen';
import CustomerServiceScreen from 'screens/CustomerServiceScreen';
import HomepageScreen from 'screens/HomepageScreen';
import NoticeScreen from 'screens/NoticeScreen';
import WalletVersionScreen from 'screens/WalletVersionScreen';
import CustomSidebarMenu from 'screens/CustomDrawerScreen';
import FingerPrintScreen from 'screens/LoginAuthScreen/FingerPrintScreen/FingerPrint';
import PinCodeScreen from 'screens/LoginAuthScreen/PinCodeScreen';
import { basicColor } from 'constants/Color';

const BottomMenuTab = createMaterialTopTabNavigator(
    {
        Home: {
            screen: MainScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => <Icon name="server" size={25} color={focused ? 'white' : 'white'} />,
            },
        },
        WalletHistory: {
            screen: WalletHistoryScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => <Icon name="file-text" size={25} color={focused ? 'white' : 'white'} />,
            },
        },
        AddressBook: {
            screen: AddressBookScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => <Icon name="book" size={25} color={focused ? 'white' : 'white'} />,
            },
        },
        Setting: {
            screen: SettingScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => <Icon name="settings" size={25} color={focused ? 'white' : 'white'} />,
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
                margin: 3,
            },
            iconStyle: {
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
            },
            showIcon: true,
            showLabel: false,
            indicatorStyle: {
                borderBottomColor: 'white',
                borderBottomWidth: 3,
            },
        },
    },
);

BottomMenuTab.navigationOptions = ({ navigation, screenProps }) => ({
    title: 'ROZ',
    headerLeft: (
        <TouchableOpacity
            onPress={() => {
                navigation.openDrawer();
            }}>
            <Icon name="menu" size={30} color={'white'} />
        </TouchableOpacity>
    ),
    headerLeftContainerStyle: { marginLeft: 20 },
});

const BottomStack = createStackNavigator(
    {
        Home: {
            screen: BottomMenuTab,
        },
        CustomerService: {
            screen: CustomerServiceScreen,
            navigationOptions: ({ screenProps }) => ({
                headerTitle: screenProps.lang.customerService,
            }),
        },
        Homepage: {
            screen: HomepageScreen,
            navigationOptions: ({ screenProps }) => ({
                headerTitle: screenProps.lang.homepage,
            }),
        },
        Notice: {
            screen: NoticeScreen,
            navigationOptions: ({ screenProps }) => ({
                headerTitle: screenProps.lang.notice,
            }),
        },
        WalletVersion: {
            screen: WalletVersionScreen,
            navigationOptions: ({ screenProps }) => ({
                headerTitle: screenProps.lang.walletInfo,
            }),
        },
        Send: {
            screen: SendScreen,
            navigationOptions: ({ screenProps }) => ({
                headerTitle: screenProps.lang.send,
            }),
        },
        QrcodeText: {
            screen: QrcodeTextScreen,
            navigationOptions: ({ screenProps }) => ({
                headerTitle: screenProps.lang.receive,
            }),
        },
        QrcodeScanner: {
            screen: QrcodeScannerScreen,
            navigationOptions: ({ screenProps }) => ({
                headerTitle: screenProps.lang.qrcode,
            }),
        },
        FingerPrint: {
            screen: FingerPrintScreen,
            navigationOptions: {
                header: null,
            },
        },
        PinCode: {
            screen: PinCodeScreen,
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
