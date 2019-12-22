import { StyleSheet } from 'react-native';
import { rozeusColor } from 'constants/Color';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    logoLayout: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: rozeusColor,
    },
    logoSubTextLayout: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    logoTextLayout: {
        fontSize: 60,
        color: 'white',
        fontWeight: 'bold',
    },
    buttonLayout: {
        flex: 6,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: 'flex-end',
    },
    buttonStyle: {
        flex: 1,
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
});
