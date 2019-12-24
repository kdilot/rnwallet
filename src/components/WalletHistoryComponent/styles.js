import { StyleSheet } from 'react-native';
import { dividerLightColor, dividerDarkColor } from 'constants/Color';

export default StyleSheet.create({
    cardLayout: {
        height: 220,
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
        flex: 7,
        padding: 10,
    },
    contentAddressGroup: {
        marginBottom: 5,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: dividerLightColor,
    },
    contentAddressStyle: {
        color: dividerDarkColor,
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
