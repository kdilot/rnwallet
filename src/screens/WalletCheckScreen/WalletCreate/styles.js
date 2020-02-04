import { StyleSheet } from 'react-native';
import { MAIN_BLUE_COLOR } from 'constants/Color';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: MAIN_BLUE_COLOR,
    },
    textareaLayout: {
        flex: 2.5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 30,
        backgroundColor: MAIN_BLUE_COLOR,
    },
    textarea: {
        width: '100%',
        height: 100,
        borderColor: 'gray',
        color: 'white',
        fontSize: 16,
        marginTop: 20,
    },
    buttonLayout: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    confirmLayout: {
        flex: 6,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    confirmTextLayout: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    confirmGridLayout: {
        flex: 3,
        paddingHorizontal: 20,
    },
    wordLayout: {
        padding: 15,
        paddingHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: MAIN_BLUE_COLOR,
    },
});
