import { StyleSheet } from 'react-native';
import { MAIN_BLUE_COLOR, DARK_COLOR2, LIGHT_COLOR, LIGHT_COLOR2 } from 'constants/Color';

export default StyleSheet.create({
    ContainerView: {
        flex: 1,
        backgroundColor: LIGHT_COLOR,
    },
    ItemTypeView: {
        zIndex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: LIGHT_COLOR,
    },
    ItemView: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1.5,
        borderBottomColor: LIGHT_COLOR2,
    },
    TypeSelectedView: {
        borderBottomColor: MAIN_BLUE_COLOR,
        borderBottomWidth: 3,
    },
    ItemText: {
        fontSize: 14,
        color: DARK_COLOR2,
        textAlign: 'center',
    },
    TypeSelectedText: {
        fontWeight: 'bold',
        color: MAIN_BLUE_COLOR,
    },
    ItemListView: {
        flex: 7,
        paddingVertical: 14,
        paddingHorizontal: 20,
        width: '100%',
    },
    AddressBookView: {
        flex: 1,
    },
    DividerView: {
        height: 14,
    },
});
