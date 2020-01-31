import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    topTab: {
        height: 50,
        flexDirection: 'row',
    },
    topTab__faqBox: { flex: 1, height: '100%' },
    topTab__faqTouchBox: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    'topTab__faqTouchBox--focused': {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'blue',
    },
    topTab__faqText: {},
    'topTab__faqText--focused': { color: 'blue' },
    topTab__emailBox: { flex: 1, height: '100%' },
    topTab__emailTouchBox: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    'topTab__emailTouchBox--focused': {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'blue',
    },
    topTab__emailText: {},
    'topTab__emailText--focused': { color: 'blue' },
    contents: {
        flex: 1,
    },
    contents__faqList: {},
    contents__emailBox: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contents__emaiText: {},
});
