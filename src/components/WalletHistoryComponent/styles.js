import { StyleSheet } from 'react-native';
import { DARK_COLOR } from 'constants/Color';

export default StyleSheet.create({
    ContainerView: {
        borderRadius: 10,
        backgroundColor: 'white',
    },
    AddressView: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 14,
        paddingRight: 4,
    },
    AddressText: {
        flex: 9,
        alignSelf: 'center',
        fontSize: 16,
        paddingRight: 10,
        paddingLeft: 20,
    },
    AddressButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    InfoView: {
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    InfoIconView: {
        flex: 1,
    },
    InfoTextView: {
        flex: 9,
        paddingTop: 4,
        paddingLeft: 8,
    },
    InfoTextGroupView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    InfoTextColor: color => ({
        color: color,
        fontSize: 10,
    }),
    InfoTimeText: {
        fontSize: 10,
        color: DARK_COLOR,
    },
    InfoValueText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 6,
    },
    MoreBtnView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    MoreView: {
        backgroundColor: '#f2f2f2',
    },
    MoreItemView: {
        flexDirection: 'row',
        paddingVertical: 3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 8,
    },
    MoreItemImage: {
        flex: 1,
    },
    MoreItemText: {
        flex: 8,
        fontSize: 12,
        color: DARK_COLOR,
        paddingLeft: 6,
    },
    MoreItemButton: {
        flex: 1,
        alignItems: 'flex-end',
    },
});
