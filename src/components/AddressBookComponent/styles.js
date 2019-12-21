import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        margin: 7,
    },
    addressTextStyle: {
        marginBottom: 5,
        fontWeight: 'bold',
    },
    cardLayout: {
        height: 65,
    },
    addressLayout: {
        flex: 2,
        justifyContent: 'center',
    },
    addressTextfield: {
        paddingHorizontal: 10,
        height: 40,
    },
    borderColor: color => ({
        borderBottomWidth: 2,
        borderBottomColor: color,
    }),
    addressButtonLayout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 10,
        paddingVertical: 5,
    },
    addressButtonTextStlye: {
        fontSize: 13,
    },
    TextColor: color => ({
        color: color,
        fontWeight: 'bold',
    }),
});
