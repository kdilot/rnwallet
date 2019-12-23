import { StyleSheet } from 'react-native';
import { basicColor, whiteColor } from 'constants/Color';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
    },
    itemTypeLayout: {
        flex: 1,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemListLayout: {
        flex: 7,
        paddingVertical: 5,
        paddingHorizontal: 15,
        width: '100%',
    },
    typeLayout: {
        flexDirection: 'row',
        marginHorizontal: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    alignCenter: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 15,
        textAlign: 'center',
    },
    typeSelected: {
        backgroundColor: basicColor,
    },
    typeSelectedText: {
        color: whiteColor,
    },
    addressBookLayout: {
        padding: 10,
        marginHorizontal: 15,
        borderRadius: 5,
    },
});
