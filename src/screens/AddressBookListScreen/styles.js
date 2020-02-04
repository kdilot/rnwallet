import { StyleSheet, Dimensions } from 'react-native';
import { BOX_BORDER_COLOR } from 'constants/Color';

export default StyleSheet.create({
    ContainerView: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderTopWidth: 0.5,
        borderColor: BOX_BORDER_COLOR,
    },
    AbsoluteView: {
        position: 'absolute',
        bottom: 12,
        left: Dimensions.get('screen').width / 2 - 25,
    },
    AddBtnView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    AddBtnIconView: {
        fontSize: 30,
        color: 'white',
    },
});
