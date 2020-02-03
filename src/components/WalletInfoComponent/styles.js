import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    ContainerView: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    CardView: {
        flex: 1,
        margin: 80,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    HeaderView: {
        flex: 9,
        width: '100%',
    },
    TextHeaderView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextHeaderGroup: {
        flex: 4,
    },
    TextHeaderText: {
        fontSize: 22,
        color: 'white',
    },
    ContentView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    ContentIconView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    ContentIconText: {
        marginLeft: 8,
        fontSize: 12,
        color: 'white',
    },
    ContentCoinText: {
        textAlign: 'center',
        fontSize: 34,
        color: 'white',
        marginTop: 20,
    },
    FooterView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    ButtonGroupView: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonLine: {
        borderRightWidth: 1,
        borderRightColor: 'white',
    },
    ButtonText: {
        fontSize: 16,
        color: 'white',
    },
});
