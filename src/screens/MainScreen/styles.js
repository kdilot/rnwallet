import { StyleSheet } from 'react-native';
import { LIGHT_COLOR } from 'constants/Color';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: LIGHT_COLOR,
    },
    HeaderView: {
        justifyContent: 'center',
        height: 50,
        paddingLeft: 10,
    },
    HeaderTitleView: {
        height: 50,
        justifyContent: 'flex-end',
        paddingLeft: 40,
        paddingTop: 14,
    },
    HeaderTitleText: {
        fontSize: 24,
        color: 'white',
    },
    CoinTypeView: {
        paddingRight: 30,
    },
    ContentView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 40,
        paddingTop: 20,
    },
    SliderView: {},
});
