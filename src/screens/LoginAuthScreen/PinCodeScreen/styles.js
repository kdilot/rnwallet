import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#545aef',
    },
    titleLayout: {
        flex: 3,
        alignContent: 'center',
        justifyContent: 'flex-end',
    },
    pinLayout: {
        flex: 1,
        alignItems: 'center',
        padding: 0,
        margin: 0,
    },
    restoreLayout: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    pinTextStyle: {
        padding: 10,
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    pinContainerStyle: {
        flex: 2,
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
    },
    pinStyle: {
        backgroundColor: 'white',
        padding: 5,
        marginLeft: 10,
        marginRight: 10,
    },
    pinActiveStyle: {
        backgroundColor: '#fb8325',
    },
    restoreTextStyle: {
        color: 'white',
        textDecorationLine: 'underline',
        fontSize: 16,
    },
    inputLayout: {
        flex: 4,
        justifyContent: 'flex-end',
    },
    keyStyle: {
        borderRightColor: '#fff',
        borderBottomColor: '#fff',
        borderRadius: 30,
    },
    keyboardStyle: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    closeView: {
        position: 'absolute',
        width: 50,
        height: 50,
        top: 10,
        right: 10,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
