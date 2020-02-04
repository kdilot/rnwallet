import { StyleSheet } from 'react-native';
import { BOX_BORDER_COLOR } from 'constants/Color';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
    },
    textareaLayout: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: 20,
    },
    textStyle: {
        marginTop: 15,
        marginBottom: 10,
        paddingLeft: 10,
        fontSize: 14,
        textAlign: 'left',
        alignSelf: 'flex-start',
    },
    textareaStyle: {
        width: '100%',
        height: 140,
        borderColor: BOX_BORDER_COLOR,
        borderWidth: 1,
        color: 'black',
        fontSize: 16,
        padding: 10,
    },
    buttonLayout: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'flex-end',
    },
});
