import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    disText: {
        color: 'white',
    },
    disContainer: {
        backgroundColor: '#aaa',
    },
    buttonLayout: ({ color, outline, radius }) => ({
        width: '100%',
        padding: 8,
        backgroundColor: outline ? 'white' : color,
        borderWidth: outline ? 1 : 0,
        borderColor: outline ? color : color,
        borderRadius: radius,
    }),
    buttonTextLayout: ({ color, outline }) => ({
        color: outline ? color : 'white',
    }),
});
