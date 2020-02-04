import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f8f8f8',
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
