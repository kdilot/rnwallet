import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import NoticeScreen from 'screens/NoticeScreen';

const DrawerNavigator = createDrawerNavigator(
    {
        Notice: {
            screen: NoticeScreen,
            navigationOptions: {
                drawerLabel: 'Demo Screen 1',
            },
        },
        Notice2: {
            screen: NoticeScreen,
            navigationOptions: {
                drawerLabel: 'Demo Screen 2',
            },
        },
    },
    {
        drawerWidth: 300,
        drawerPosition: 'left',
        initialRouteName: 'Notice',
    },
);

export default createAppContainer(DrawerNavigator);
