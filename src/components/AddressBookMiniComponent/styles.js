import { StyleSheet } from 'react-native';
import { dividerLightColor } from 'constants/Color';

export default StyleSheet.create({
    ContainerView: {
        flex: 1,
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
    DividerView: {
        height: 1,
        backgroundColor: dividerLightColor,
    },
    IsEmptyView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
