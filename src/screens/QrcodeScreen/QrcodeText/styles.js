import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    address: {
        padding: 10,
        backgroundColor: '#aaa',
        fontSize: 15,
        textAlign: 'center',
    },
    qrLayout: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addressLayout: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    buttonLayout: {
        flex: 3,
        width: '100%',
        paddingHorizontal: 50,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
});
