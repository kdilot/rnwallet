import { StyleSheet } from 'react-native';
import { basicColor } from 'constants/Color';

export default StyleSheet.create({
    ContainerView: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    ItemTypeView: {
        zIndex: 1,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#f8f8f8',
    },
    ItemView: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1.5,
        borderBottomColor: '#c9c9c9',
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
