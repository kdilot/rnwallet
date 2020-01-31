import { StyleSheet } from 'react-native';
import { dividerDarkColor } from 'constants/Color';

export default StyleSheet.create({
    ContainerView: {
        flex: 1,
    },
    HeaderView: {
        flex: 8,
    },
    CoinView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    CoinIcon: {
        width: 30,
        height: 30,
        borderRadius: 5,
        borderWidth: 1,
        marginRight: 10,
    },
    CoinText: {
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    InputView: {
        marginBottom: 10,
    },
    AddressView: {
        flexDirection: 'row',
    },
    QrIcon: {
        position: 'absolute',
        top: 6,
        right: 10,
    },
    BottomView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    SliderView: {
        marginVertical: 10,
    },
    FeeView: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    FeeText: {
        flex: 1,
    },
    InputText: {
        paddingBottom: 5,
        fontSize: 12,
    },
    InputBoxView: {
        padding: 10,
        height: 40,
        borderColor: dividerDarkColor,
        borderWidth: 1,
    },
});
