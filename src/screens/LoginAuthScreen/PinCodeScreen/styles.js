import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    textLayout: {
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
    pinTextStyle: {
        padding: 10,
        textAlign: 'center',
    },
    pinContainerStyle: {
        flex: 2,
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
    },
    pinStyle: {
        backgroundColor: 'gray',
        marginLeft: 10,
        marginRight: 10,
    },
    pinActiveStyle: {
        backgroundColor: 'yellow',
    },
    inputLayout: {
        flex: 7,
        justifyContent: 'flex-end',
    },
});
