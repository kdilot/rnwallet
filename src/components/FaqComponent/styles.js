import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        height: 50,
    },
    'container--extended': {
        height: 150,
    },
    faq: {
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        flex: 1,
        flexDirection: 'row',
    },
    faq__iconBox: { flex: 1.5, justifyContent: 'center', alignItems: 'center' },
    faq__titleBox: { flex: 7.5, justifyContent: 'center', overflow: 'hidden' },
    faq__btnBox: {
        flex: 1,
    },
    faq__btnTouchBox: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    'faq--extended': {
        height: 100,
        backgroundColor: 'gray',
        flexDirection: 'row',
        paddingVertical: 10,
    },
    'faq--extended__iconBox': {
        flex: 1.5,
        alignItems: 'center',
    },
    'faq--extended__contentsBox': { flex: 8.5 },
    'faq--none': {
        display: 'none',
    },
});
