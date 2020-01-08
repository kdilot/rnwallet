import { StyleSheet } from 'react-native';
import { dividerDarkColor } from 'constants/Color';

export default StyleSheet.create({
    cardLayout: { padding: 15, margin: 10 },
    timeLayout: {
        flex: 1,
    },
    timeTextStyle: {
        textAlign: 'right',
        opacity: 0.7,
    },
    addressLayout: {
        flex: 1,
        paddingRight: 25,
        paddingVertical: 5,
        justifyContent: 'center',
    },
    contentLayout: {
        flex: 8,
    },
    contentHeaderLayout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerIconLayout: {
        flex: 1,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTextLayout: {
        flex: 7,
    },
    headerTextGroup: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    contentTextGroup: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 2,
    },
    borderColor: color => ({
        borderBottomWidth: 2,
        borderBottomColor: color,
    }),
    addressButtonGroup: {
        position: 'absolute',
        right: 0,
        bottom: 5,
    },
    addressButtonTextStlye: {
        flex: 1,
        fontSize: 13,
    },
    contentAddressGroup: {
        marginTop: 10,
    },
    contentAddressListLayout: {
        marginTop: 5,
    },
    contentAddressTitle: {
        width: 50,
        padding: 0.5,
        fontSize: 12,
        textAlign: 'center',
        color: dividerDarkColor,
        borderWidth: 1,
        borderColor: dividerDarkColor,
        borderRadius: 2,
    },
    TextIsSendStyle: color => ({
        borderWidth: 1,
        borderColor: color,
        color: color,
        textAlign: 'center',
    }),
    TextColor: color => ({
        color: color,
        fontWeight: 'bold',
    }),
    BoxTextColor: (color, opacity) => ({
        width: 70,
        color: 'white',
        opacity,
        padding: 0.5,
        backgroundColor: color,
        fontWeight: 'bold',
        textAlign: 'center',
    }),
    contentTextStyle: {
        flex: 4,
        fontSize: 17,
    },
    alignRight: {
        textAlign: 'right',
    },
});
