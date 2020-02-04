import { StyleSheet } from 'react-native';
import { MAIN_BLUE_COLOR, MAIN_ORANGE_COLOR } from 'constants/Color';

export default StyleSheet.create({
    ContainerView: {
        flex: 1,
        backgroundColor: MAIN_BLUE_COLOR,
    },
    TitleView: {
        flex: 3,
        alignContent: 'center',
        justifyContent: 'flex-end',
    },
    PinView: {
        flex: 1,
        alignItems: 'center',
        padding: 0,
        margin: 0,
    },
    RestoreView: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    TitleText: {
        padding: 10,
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    PinContainerStyle: {
        flex: 2,
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
    },
    PinStyle: {
        backgroundColor: 'white',
        padding: 5,
        marginLeft: 10,
        marginRight: 10,
    },
    PinActiveStyle: {
        backgroundColor: MAIN_ORANGE_COLOR,
    },
    RestoreText: {
        color: 'white',
        textDecorationLine: 'underline',
        fontSize: 16,
    },
    NumberView: {
        flex: 4,
        justifyContent: 'flex-end',
    },
    NumberKeyStyle: {
        borderRightColor: 'white',
        borderBottomColor: 'white',
        borderRadius: 30,
    },
    NumberKeyboardStyle: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    CloseView: {
        position: 'absolute',
        width: 50,
        height: 50,
        top: 10,
        right: 10,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
