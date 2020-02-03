import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        height: 56,
        paddingLeft: 20,
        paddingRight: 0,
    },
    textLayout: {
        flex: 1,
        justifyContent: 'center',
    },
    toggleLayout: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 10,
    },
    textStyle: {
        paddingVertical: 16,
        fontSize: 16,
    },
    languageLayout: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    languageGroup: {
        marginLeft: 10,
    },
});
