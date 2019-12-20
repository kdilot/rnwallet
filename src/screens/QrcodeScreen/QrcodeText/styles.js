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
        paddingHorizontal: '20%',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    buttonTextLayout: {
        fontSize: 18,
        color: 'white',
    },
    buttonContainerLayout: {
        height: 40,
        padding: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        backgroundColor: '#2196F3',
    },
    buttonTextOutLineLayout: {
        fontSize: 18,
        color: '#2196F3',
    },
    buttonContainerOutLineLayout: {
        height: 40,
        padding: 10,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#2196F3',
    },
});
