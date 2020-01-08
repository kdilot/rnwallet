import { StyleSheet } from 'react-native';
import { basicColor, whiteColor } from 'constants/Color';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    itemTypeLayout: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemListLayout: {
        flex: 7,
        paddingVertical: 5,
        paddingHorizontal: 5,
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
        flex: 1,
        padding: 10,
        marginHorizontal: 15,
        borderRadius: 5,
    },
    timelineLayout: {
        textAlign: 'center',
        backgroundColor: '#ff9797',
        color: 'white',
        padding: 5,
        borderRadius: 13,
    },
    isEmptyLayout: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
