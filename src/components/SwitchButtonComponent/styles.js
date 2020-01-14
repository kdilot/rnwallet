import { StyleSheet } from 'react-native';
import { basicColor } from 'constants/Color';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 20,
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
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    languageGroup: {
        padding: 5,
        marginLeft: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    languageTextStyle: {},
    selectedText: {
        borderColor: basicColor,
        color: basicColor,
        fontWeight: 'bold',
    },
});
