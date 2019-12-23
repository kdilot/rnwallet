import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    cardLayout: {
        height: 130,
        margin: 7,
    },
    addressLayout: {
        flex: 2,
        justifyContent: 'center',
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
        paddingTop: 5,
        paddingHorizontal: 10,
    },
    addressButtonGroup: {
        flex: 1,
        paddingHorizontal: 5,
    },
    addressButtonTextStlye: {
        flex: 1,
        fontSize: 13,
    },
    addressTextfield: {
        paddingHorizontal: 10,
        height: 40,
    },
    contentLayout: {
        flex: 4,
        flexDirection: 'row',
    },
    contentIconLayout: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    contentIconStyle: {
        width: 50,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentTextLayout: {
        flex: 5,
        justifyContent: 'center',
    },
    contentTextGroup: {
        flexDirection: 'row',
    },
    IconColor: color => ({
        backgroundColor: color,
    }),
    TextColor: color => ({
        color: color,
        fontWeight: 'bold',
    }),
    contentTextStyle: {
        flex: 1,
        paddingRight: 15,
    },
    alignRight: {
        textAlign: 'right',
    },
});
