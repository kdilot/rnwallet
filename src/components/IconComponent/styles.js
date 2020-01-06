import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
    },
    size: size => ({
        width: size,
        height: size,
    }),
});
