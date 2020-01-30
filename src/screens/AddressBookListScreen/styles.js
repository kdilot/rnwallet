import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    ContainerView: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    AbsoluteView: {
        position: 'absolute',
        bottom: 20,
        left: Dimensions.get('screen').width / 2 - 25,
    },
    AddBtnView: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
    },
    AddBtnIconView: {
        fontSize: 30,
        color: 'white',
    },
    IsEmptyView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
