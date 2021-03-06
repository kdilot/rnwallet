import { StyleSheet } from 'react-native';
import { DARK_COLOR, LIGHT_COLOR2 } from 'constants/Color';

export default StyleSheet.create({
    container: { flex: 1 },
    noticeDetail: { flex: 1 },
    noticeDetail__titleBox: { height: 64, justifyContent: 'center', paddingLeft: 20, borderBottomWidth: 1, borderBottomColor: LIGHT_COLOR2 },
    noticeDetail__title: { fontSize: 16, lineHeight: 24, color: 'black' },
    noticeDetail__inDt: { fontSize: 10, lineHeight: 15, color: DARK_COLOR },
    noticeDetail__contentsBox: { flex: 1, padding: 20 },
    noticeDetail__contents: { fontSize: 14, lineHeight: 20 },
});
