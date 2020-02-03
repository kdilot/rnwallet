import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    logoSubTextLayout: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    logoTextLayout: {
        fontSize: 60,
        color: 'white',
        fontWeight: 'bold',
    },
    buttonLayout: {
        flex: 6,
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
