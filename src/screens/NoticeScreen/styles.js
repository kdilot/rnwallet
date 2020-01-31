import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { flex: 1 },
    noticeDetail: { flex: 1 },
    noticeDetail__titleBox: { flex: 1.5, justifyContent: 'center', paddingLeft: 20, borderBottomWidth: 1, borderBottomColor: 'gray' },
    noticeDetail__title: { fontSize: 18, fontWeight: 'bold' },
    noticeDetail__inDt: { fontSize: 12, color: 'gray' },
    noticeDetail__contentsBox: { flex: 8.5 },
    noticeDetail__contents: { fontSize: 18, marginTop: 20, marginLeft: 20 },
});
