import { StyleSheet } from 'react-native';
import { MAIN_BLUE_COLOR, MAIN_ORANGE_COLOR, SUCCESS_COLOR, FAIL_COLOR, PENDING_COLOR, BOX_BORDER_COLOR, DARK_COLOR, DARK_COLOR2, LIGHT_COLOR, LIGHT_COLOR2 } from 'constants/Color';

export default StyleSheet.create({
    container: {
        height: 60,
    },
    'container--extended': {
        height: 134,
    },
    faq: {
        borderBottomWidth: 1,
        borderBottomColor: LIGHT_COLOR2,
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 10,
    },
    faq__iconBox: { width: 18, height: '100%', justifyContent: 'center' },
    faq__titleBox: { flex: 1, justifyContent: 'center', overflow: 'hidden', paddingLeft: 10 },
    faq__title: { fontSize: 16, lineHeight: 34 },
    faq__btnBox: {
        width: 34,
        height: '100%',
        justifyContent: 'center',
    },

    'faq--extended': {
        height: 74,
        backgroundColor: '#f2f2f2',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    'faq--extended__iconBox': {
        width: 18,
        height: '100%',
    },
    'faq--extended__contentsBox': { flex: 1, paddingLeft: 10 },
    'faq--extended__contents': { fontSize: 12, lineHeight: 18, color: '#717171' },
    'faq--none': {
        display: 'none',
    },
});
