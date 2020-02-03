import { StyleSheet, Dimensions } from 'react-native';

const WIDTH = Dimensions.get('screen').width * 0.65;

export default StyleSheet.create({
    ContainerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
    },
    OverlayView: {
        width: WIDTH,
        borderRadius: 20,
    },
    MessageView: {
        flex: 1,
    },
    MessageText: {
        fontSize: 16,
        textAlign: 'center',
    },
    IconView: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
