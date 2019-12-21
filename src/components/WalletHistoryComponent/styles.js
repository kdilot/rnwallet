import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    cardLayout: {
        height: 120,
        margin: 7,
    },
    contentLayout: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    contentIconLayout: {
        flex: 1,
        paddingHorizontal: 10,
    },
    contentIconStyle: {
        width: 60,
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    IconColor: color => ({
        backgroundColor: color,
    }),
    TextColor: color => ({
        color: color,
        fontWeight: 'bold',
    }),
    contentTextLayout: {
        flex: 5,
        height: 60,
    },
    contentTextFirstLine: {
        flex: 1,
        paddingRight: 10,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    contentTextSecondLine: {
        flex: 1,
        paddingRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerLayout: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerTextStyle: {
        flex: 1,
        textAlign: 'center',
    },
});
