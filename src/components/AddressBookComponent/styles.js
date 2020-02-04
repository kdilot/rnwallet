import { StyleSheet } from 'react-native';

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
    },
    AddressView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
    },
    AddressText: {
        flex: 9,
        fontSize: 12,
        color: '#777777',
    },
});
