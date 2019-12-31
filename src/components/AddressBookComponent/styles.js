import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        margin: 5,
        marginVertical: 7,
    },

    cardLayout: {
        padding: 10,
        paddingHorizontal: 15,
        flexDirection: 'row',
    },
    textLayout: {
        flex: 15,
    },
    textInputLayout: {
        height: 40,
        justifyContent: 'center',
    },
    sendButtonLayout: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
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
        borderBottomWidth: 2,
        borderBottomColor: color,
    }),

    TextColor: color => ({
        color: color,
        fontWeight: 'bold',
    }),
});
