import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { height: 64, flexDirection: 'row', paddingLeft: 20 },
    titleBox: { flex: 1, justifyContent: 'center' },
    title: { fontSize: 16, overflow: 'hidden', color: '#000000', lineHeight: 24 },
    inDt: { fontSize: 10, color: '#777777' },
    btnBox: { width: 66, alignItems: 'center', flexDirection: 'row' },
    newIcon: { width: 18, height: 18 },
    moreBtn: { width: 34, height: 34, marginLeft: 4 },
});
