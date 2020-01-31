import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: { height: 65 },
    container__touch: {
        flexDirection: 'row',
        height: '100%',
        paddingLeft: 20,
    },
    titleBox: { flex: 8, justifyContent: 'center' },
    title: { fontSize: 18, overflow: 'hidden' },
    inDt: { fontSize: 10 },
    btnBox: { flex: 2, alignItems: 'center', flexDirection: 'row' },
});
