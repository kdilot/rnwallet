import { StyleSheet, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIHGT = Dimensions.get('window').height;

export default StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 9999,
    },
    backgroundLayout: {
        position: 'absolute',
        top: 0,
        width: WIDTH,
        height: HEIHGT,
        zIndex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    closeLayout: {
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        margin: 10,
        padding: 5,
        width: 40,
        height: 40,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    closeText: {
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
    msgLayout: {
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        width: '60%',
        height: '20%',
        borderRadius: 5,
        backgroundColor: 'white',
        padding: 15,
    },
    msgHeaderLayout: {
        flex: 1,
        justifyContent: 'center',
    },
    msgHeaderText: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    msgContentLayout: {
        flex: 2,
        justifyContent: 'center',
    },
});
