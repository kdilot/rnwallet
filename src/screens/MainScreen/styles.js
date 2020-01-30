import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#6ab8f7',
        paddingTop: Platform.OS === 'ios' ? 40 : 0,
    },
    HeaderView: {
        justifyContent: 'center',
        height: 60,
        paddingLeft: 20,
    },
    HeaderTitleView: {
        height: 60,
        justifyContent: 'flex-end',
        paddingLeft: 60,
    },
    HeaderTitleText: {
        fontSize: 30,
    },
    CoinTypeView: {
        padding: 20,
    },
    CoinTypeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        borderBottomWidth: 2,
        borderColor: 'transparent',
    },
    CoinSelected: isRoz => ({
        color: isRoz ? 'blue' : 'orange',
        borderColor: isRoz ? 'blue' : 'orange',
        borderBottomWidth: 2,
    }),
    ContentView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 40,
    },
    SliderView: {
        paddingHorizontal: 15,
    },
});
