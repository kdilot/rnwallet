import { StyleSheet } from 'react-native';
import { dividerLightColor } from 'constants/Color';

export default StyleSheet.create({
    ContainerView: {
        flex: 1,
    },
    ListView: {
        padding: 20,
        flex: 1,
        width: '100%',
    },
    ListGroupView: {
        flexDirection: 'row',
    },
    ListTextView: {
        flex: 8,
    },
    ListIconView: {
        flex: 1,
        alignItems: 'flex-end',
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
