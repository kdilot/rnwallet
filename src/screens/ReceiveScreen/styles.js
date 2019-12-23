import { StyleSheet } from 'react-native';
import { dividerDarkColor } from 'constants/Color';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-around',
    },
    headerLayout: {
        height: 200,
    },
    textareaLayout: {
        flex: 1,
        height: '100%',
        justifyContent: 'flex-start',
    },
    textareaIconStyle: {
        position: 'absolute',
        top: 6,
        right: 10,
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
    textStyle: {
        paddingLeft: 5,
        paddingBottom: 5,
        fontSize: 12,
    },
    textInputStyle: {
        padding: 10,
        height: 40,
        borderColor: dividerDarkColor,
        borderWidth: 1,
        borderRadius: 5,
    },
});
