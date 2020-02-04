import { StyleSheet } from 'react-native';
import { DARK_COLOR } from 'constants/Color';

export default StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    address: {
        padding: 20,
        fontSize: 15,
        textAlign: 'center',
        color: DARK_COLOR,
    },
    qrLayout: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLayout: {
        flex: 2,
        flexDirection: 'row',
        paddingHorizontal: 25,
        paddingBottom: 20,
        alignItems: 'flex-end',
    },
    buttonStyle: {
        flex: 1,
        justifyContent: 'center',
    },
});
