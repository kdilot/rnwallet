import { StyleSheet } from 'react-native';
import { basicColor, whiteColor } from 'constants/Color';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: basicColor,
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
        color: whiteColor,
        textAlign: 'center',
    },
    pinContainerStyle: {
        flex: 2,
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
    },
    pinStyle: {
        backgroundColor: whiteColor,
        padding: 15,
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
