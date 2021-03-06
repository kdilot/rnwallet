import { StyleSheet } from 'react-native';
import { DARK_COLOR } from 'constants/Color';

export default StyleSheet.create({
    ContainerView: {
        flexDirection: 'row',
        paddingHorizontal: 20,
    },
    TextView: {
        flex: 8,
    },
    ButtonView: {
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextInputView: {
        fontSize: 14,
        justifyContent: 'center',
    },
    InputView: {
        paddingVertical: 12,
        padding: 0,
    },
    AddressView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
    },
    AddressText: {
        flex: 9,
        fontSize: 12,
        color: DARK_COLOR,
    },
});
