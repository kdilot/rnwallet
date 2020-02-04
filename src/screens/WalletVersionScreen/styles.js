import { StyleSheet } from 'react-native';
import { DARK_COLOR } from 'constants/Color';

export default StyleSheet.create({
    ContainerView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    MsgTitleText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 20,
    },
    MsgContentText: {
        textAlign: 'center',
        fontSize: 12,
        color: DARK_COLOR,
        marginTop: 10,
    },
});
