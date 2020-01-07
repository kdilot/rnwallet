import { StyleSheet } from 'react-native';
import { dividerDarkColor } from 'constants/Color';

export default StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    cardLayout: isLoad => ({
        width: '100%',
        height: 200,
        paddingHorizontal: isLoad ? 15 : 0,
    }),
    headerLayout: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTextStyle: {
        fontSize: 20,
    },
    contentLayout: {
        flex: 2,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentIconStyle: {
        flex: 1,
        alignItems: 'flex-start',
    },
    contentTextGroup: {
        flex: 4,
    },
    alignRight: {
        alignItems: 'flex-end',
    },
    contentTextStyle: {
        textAlign: 'center',
        fontSize: 25,
    },
    contentCoinTextStyle: {
        fontSize: 35,
        fontWeight: 'bold',
    },
    footerLayout: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: dividerDarkColor,
    },
    buttonGroup: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTextStyle: {
        fontSize: 15,
    },
});
