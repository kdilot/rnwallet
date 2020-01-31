import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
    },
    textareaLayout: {
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textStyle: {
        margin: 15,
    },
    textareaStyle: {
        width: '100%',
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        color: 'black',
        fontSize: 17,
        padding: 10,
    },
    buttonLayout: {
        flex: 1,
        justifyContent: 'flex-end',
    },
});
