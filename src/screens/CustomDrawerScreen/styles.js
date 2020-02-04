import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    ContainerView: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    LogoView: {
        flex: 2,
        width: '100%',
        backgroundColor: '#f3f3f3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    CloseView: {
        position: 'absolute',
        width: 50,
        height: 50,
        top: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ContentView: {
        flex: 5,
        width: '100%',
    },
    ItemView: {
        flex: 1,
        width: '100%',
        paddingLeft: 22,
        paddingRight: 10,
        paddingVertical: 13,
    },
    ItemArrowView: {
        position: 'absolute',
        right: 0,
        top: Platform.OS === 'ios' ? -9 : -6,
    },
});
