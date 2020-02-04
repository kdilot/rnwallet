import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    subheading: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 30,
    },
    fingerprint: {
        padding: 20,
        marginVertical: 30,
    },
    errorMessage: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 10,
        marginTop: 30,
    },
});
