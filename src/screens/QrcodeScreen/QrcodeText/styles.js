import { StyleSheet } from 'react-native';
import { DARK_COLOR } from 'constants/Color';

export default StyleSheet.create({
    ContainerView: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    AddressView: {
        padding: 20,
        fontSize: 15,
        textAlign: 'center',
        color: DARK_COLOR,
    },
    QrView: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ButtonView: {
        flex: 2,
        flexDirection: 'row',
        paddingHorizontal: 25,
        paddingBottom: 20,
        alignItems: 'flex-end',
    },
    ButtonStyle: {
        flex: 1,
        justifyContent: 'center',
    },
});
