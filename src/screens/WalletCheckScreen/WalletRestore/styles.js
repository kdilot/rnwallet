import { StyleSheet } from 'react-native';
import { BOX_BORDER_COLOR } from 'constants/Color';

export default StyleSheet.create({
    ContainerView: {
        flex: 1,
        justifyContent: 'space-around',
    },
    TextAreaView: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: 20,
    },
    TextStyle: {
        marginTop: 15,
        marginBottom: 10,
        paddingLeft: 10,
        fontSize: 14,
        textAlign: 'left',
        alignSelf: 'flex-start',
    },
    TextInputStyle: {
        width: '100%',
        height: 140,
        borderColor: BOX_BORDER_COLOR,
        borderWidth: 1,
        color: 'black',
        fontSize: 16,
        padding: 10,
    },
    ButtonView: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'flex-end',
    },
});
