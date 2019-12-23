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
        height: 70,
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        padding: 10,
    },
    addressButtonGroup: {
        flex: 1,
    },
    addressButtonTextStlye: {
        fontSize: 13,
    },
    TextColor: color => ({
        color: color,
        fontWeight: 'bold',
    }),
});
