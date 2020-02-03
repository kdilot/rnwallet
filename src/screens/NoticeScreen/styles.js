import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1 },
    noticeDetail: { flex: 1 },
    noticeDetail__titleBox: { height: 64, justifyContent: 'center', paddingLeft: 20, borderBottomWidth: 1, borderBottomColor: '#c9c9c9' },
    noticeDetail__title: { fontSize: 16, lineHeight: 24, color: '#000000' },
    noticeDetail__inDt: { fontSize: 10, lineHeight: 15, color: '#777777' },
    noticeDetail__contentsBox: { flex: 1, padding: 20 },
    noticeDetail__contents: { fontSize: 14, lineHeight: 20 },
});
