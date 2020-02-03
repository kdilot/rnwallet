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
    topTab__textBox: { flex: 1, height: '100%' },
    topTab__touchBox: { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#979797' },

    'topTab__touchBox--focused': { width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 3, borderBottomColor: '#545aef' },

    topTab__text: {
        fontSize: 14,
        lineHeight: 20,
        color: '#979797',
    },
    'topTab__text--focused': {
        fontSize: 14,
        lineHeight: 20,
        color: '#545aef',
        fontWeight: 'bold',
    },

    contents: {
        flex: 1,
    },
    contents__faqList: {},
    contents__emailBox: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contents__emailImg: {
        width: 140,
        height: 100,
    },
    contents__emaiText: { fontSize: 16, lineHeight: 24, fontWeight: 'bold', marginTop: 20 },
    contents__emaiTextDetail: { fontSize: 12, lineHeight: 18, color: '#777777', marginTop: 10 },
});
