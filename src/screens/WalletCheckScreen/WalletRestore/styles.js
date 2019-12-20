import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    textareaLayout: {
        flex: 9,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textStyle: {
        margin: 15,
    },
    textareaStyle: {
        width: '100%',
        height: '30%',
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
});
