import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { IconComponent } from 'components';
import {
    QrcodeTextScreen,
    QrcodeScannerScreen,
    MainScreen,
    WalletHistoryScreen,
    AddressBookScreen,
    SendScreen,
    SettingScreen,
    CustomerServiceScreen,
    HomepageScreen,
    NoticeScreen,
    WalletVersionScreen,
    CustomDrawerScreen,
    FingerPrintScreen,
    PinCodeScreen,
    WalletRestoreScreen,
    AddressBookListScreen,
} from 'screens';
import { LIGHT_COLOR } from 'constants/Color';

const BottomMenuTab = createMaterialTopTabNavigator(
    {
        Home: {
            screen: MainScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => <IconComponent name={focused ? 'home_s' : 'home'} size={60} />,
            },
        },
        WalletHistory: {
            screen: WalletHistoryScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => <IconComponent name={focused ? 'history_s' : 'history'} size={60} />,
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
            },
        },
        AddressBookList: {
            screen: AddressBookListScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => <IconComponent name={focused ? 'address_s' : 'address'} size={60} />,
            },
        },
        Setting: {
            screen: SettingScreen,
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => <IconComponent name={focused ? 'setting_s' : 'setting'} size={60} />,
            },
        },
    },
    {
        animationEnabled: true,
        swipeEnabled: true,
        tabBarPosition: 'bottom',
        initialRouteName: 'Home',
        tabBarOptions: {
            style: {
                height: 60,
                backgroundColor: 'white',
                borderTopWidth: 0.5,
                borderTopColor: '#f1f1f1',
            },
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

const ROUTE = {
    Home: 'home',
    WalletHistory: 'walletHistory',
    AddressBookList: 'addressBook',
    Setting: 'setting',
};

BottomMenuTab.navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.lang[ROUTE[navigation.state.routes[navigation.state.index].routeName]],
    headerLeft: (
        <TouchableOpacity
            onPress={() => {
                navigation.openDrawer();
            }}>
            <IconComponent name={'btn_menu_02'} size={40} />
        </TouchableOpacity>
    ),
    header: navigation.state.index === 0 && null,
    headerStyle: {
        backgroundColor: LIGHT_COLOR,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    },
    headerLeftContainerStyle: { marginLeft: 10 },
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
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
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
        PinCodeRestore: {
            screen: WalletRestoreScreen,
            navigationOptions: ({ screenProps }) => ({
                headerTitle: 'PIN CODE',
            }),
        },
        AddressBook: {
            screen: AddressBookScreen,
            navigationOptions: ({ screenProps }) => ({
                headerTitle: screenProps.lang.addressBook,
            }),
        },
    },
    {
        initialRouteName: 'Home',
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            headerForceInset: { top: 'never' },
            headerStyle: {
                backgroundColor: LIGHT_COLOR,
            },
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
        contentComponent: CustomDrawerScreen,
    },
);

export default createAppContainer(MainNavigator);
