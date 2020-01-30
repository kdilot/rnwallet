import { StyleSheet } from 'react-native';
import { basicColor } from 'constants/Color';

export default StyleSheet.create({
    ContainerView: {
        flex: 1,
    },
    ItemTypeView: {
        zIndex: 1,
        paddingHorizontal: 20,
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
    },
    ItemTypeLineView: {
        height: 1,
        borderWidth: 1,
        borderColor: 'gray',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        zIndex: 0,
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
        padding: 10,
        marginHorizontal: 15,
        borderRadius: 5,
    },
    IsEmptyView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
