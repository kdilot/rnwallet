import { StyleSheet } from 'react-native';
import { basicColor } from 'constants/Color';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingHorizontal: 10,
    },
    textLayout: {
        flex: 1,
        justifyContent: 'center',
    },
    toggleLayout: {
        flex: 1,
        justifyContent: 'center',
    },
    textStyle: {
        fontSize: 15,
    },
    languageLayout: {
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    languageGroup: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    languageTextStyle: {},
    selectedText: {
        borderColor: basicColor,
        color: basicColor,
        fontWeight: 'bold',
    },
});
