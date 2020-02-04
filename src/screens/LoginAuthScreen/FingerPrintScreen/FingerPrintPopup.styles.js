import { Dimensions } from 'react-native';
const WIDTH = Dimensions.get('window').width;

export default {
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#545aef',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: WIDTH * 0.61,
        height: WIDTH * 0.61,
        backgroundColor: 'white',
        zIndex: 10,
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 5,
    },
    message: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    description: error => ({
        textAlign: 'center',
        color: error ? 'red' : '#777777',
        fontSize: 10,
        marginHorizontal: 20,
    }),
    buttonContainer: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        color: '#545aef',
        fontSize: 12,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
};
