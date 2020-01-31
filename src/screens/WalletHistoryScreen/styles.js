import { StyleSheet } from 'react-native';
import { basicColor } from 'constants/Color';

export default StyleSheet.create({
    ContainerView: {
        flex: 1,
    },
    ItemTypeView: {
        zIndex: 1,
        height: 50,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    ItemView: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1.5,
        borderBottomColor: 'gray',
    },
    TypeSelectedView: {
        borderBottomColor: basicColor,
        borderBottomWidth: 4,
    },
    ItemText: {
        fontSize: 15,
        color: 'gray',
        textAlign: 'center',
    },
    TypeSelectedText: {
        fontWeight: 'bold',
        color: basicColor,
    },
    ItemListView: {
        flex: 7,
        paddingVertical: 5,
        paddingHorizontal: 5,
        width: '100%',
    },
    AddressBookView: {
        flex: 1,
    },
});
