import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    address: {
        padding: 10,
        fontSize: 15,
        textAlign: 'center',
    },
    qrLayout: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonLayout: {
        flex: 2,
        width: '100%',
        paddingHorizontal: 50,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
});
