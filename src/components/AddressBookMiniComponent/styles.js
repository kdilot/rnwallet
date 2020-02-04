import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    ContainerView: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    ListView: {
        flex: 1,
        width: '100%',
    },
    ListGroupView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ListTextView: {
        flex: 8,
        padding: 20,
    },
    ListIconView: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    IsEmptyView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
