import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    textareaLayout: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textarea: {
        width: '100%',
        height: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        color: 'black',
        fontSize: 17,
        padding: 10,
    },
    buttonLayout: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmLayout: {
        flex: 5,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmTextLayout: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    confirmGridLayout: {
        flex: 3,
    },
});
