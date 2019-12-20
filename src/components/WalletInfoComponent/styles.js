import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    cardLayout: {
        width: '100%',
        height: 200,
        padding: 15,
    },
    headerLayout: {
        flex: 1,
        paddingBottom: 20,
        alignItems: 'flex-end',
    },
    contentLayout: {
        flex: 3,
        padding: 5,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    contentIconStyle: {
        flex: 2,
        alignItems: 'flex-start',
    },
    contentTextGroup: {
        flex: 4,
    },
    alignRight: {
        paddingRight: 25,
        alignItems: 'flex-end',
    },
    listTextStyle: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    listTextSubStyle: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#8A8A8A',
    },
    contentAddressLayout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressTextStyle: {
        fontSize: 11,
        textAlign: 'center',
    },
    footerLayout: {
        flex: 2,
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonGroup: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    buttonTextStyle: {
        fontSize: 15,
    },
});
