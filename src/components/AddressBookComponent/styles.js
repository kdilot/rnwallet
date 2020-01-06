import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        margin: 5,
        marginVertical: 7,
    },

    cardLayout: {
        flexDirection: 'row',
    },
    textLayout: {
        flex: 9,
        paddingVertical: 10,
        paddingLeft: 15,
        paddingRight: 0,
    },
    textInputLayout: {
        justifyContent: 'center',
        borderBottomWidth: 2,
    },
    sendButtonLayout: {
        flex: 1,
        padding: 10,
        borderLeftWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    historyButtonLayout: {
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    addressTextStyle: {
        fontSize: 11,
        paddingTop: 4,
    },

    borderColor: color => ({
        borderColor: color,
    }),

    TextColor: color => ({
        color: color,
        fontWeight: 'bold',
    }),
});
