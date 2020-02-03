import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoLayout: {
        flex: 2,
        width: '100%',
        backgroundColor: '#f3f3f3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeView: {
        position: 'absolute',
        width: 50,
        height: 50,
        top: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentLayout: {
        flex: 5,
        width: '100%',
    },
    itemLayout: {
        flex: 1,
        width: '100%',
        paddingLeft: 22,
        paddingRight: 10,
        paddingVertical: 13,
    },
    itemArrowLayout: {
        position: 'absolute',
        right: 0,
        top: Platform.OS === 'ios' ? -9 : -6,
    },
});
