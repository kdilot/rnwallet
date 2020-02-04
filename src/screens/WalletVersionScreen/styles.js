import { StyleSheet } from 'react-native';
import { DARK_COLOR } from 'constants/Color';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    msgTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 20,
    },
    msgContent: {
        textAlign: 'center',
        fontSize: 12,
        color: DARK_COLOR,
        marginTop: 10,
    },
});
