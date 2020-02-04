import { Dimensions } from 'react-native';
import { MAIN_BLUE_COLOR, DARK_COLOR } from 'constants/Color';
const WIDTH = Dimensions.get('window').width;

export default {
    ContainerView: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: MAIN_BLUE_COLOR,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ContentView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: WIDTH * 0.61,
        height: WIDTH * 0.61,
        backgroundColor: 'white',
        zIndex: 10,
    },
    LogoView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 5,
    },
    MessageView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    Description: error => ({
        textAlign: 'center',
        color: error ? 'red' : DARK_COLOR,
        marginHorizontal: 20,
    }),
    ButtonView: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 30,
    },
    ButtonText: {
        color: MAIN_BLUE_COLOR,
        fontSize: 15,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
};
