import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#6ab8f7',
    },
    HeaderView: {
        height: 50,
        padding: 20,
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
    contentLayout: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    contentText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    sliderLayout: {
        paddingHorizontal: 15,
    },
});
