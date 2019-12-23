import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-around',
    },
    headerLayout: {
        height: 200,
    },
    textareaGroup: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textareaLayout: {
        flex: 1,
        height: '100%',
        justifyContent: 'flex-start',
    },
    textareaIconStyle: {
        position: 'relative',
        top: 3,
        marginLeft: 5,
    },
    buttonLayout: {
        flex: 2,
        justifyContent: 'flex-end',
    },
    feeTextLayout: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    feeTextStyle: {
        flex: 1,
    },
});
