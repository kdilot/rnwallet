import { StyleSheet } from 'react-native';
import { BOX_BORDER_COLOR } from 'constants/Color';

export default StyleSheet.create({
    ContainerView: {
        flex: 1,
        borderTopWidth: 0.5,
        borderColor: BOX_BORDER_COLOR,
    },
    DividerView: {
        height: 1,
        backgroundColor: '#f4f4f4',
    },
});
