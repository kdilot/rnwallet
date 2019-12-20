import { StyleSheet } from 'react-native';
import { rozeusColor } from 'constants/Color';

export default StyleSheet.create({
    container: {
        backgroundColor: rozeusColor,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    text: {
        fontSize: 55,
        fontWeight: 'bold',
        color: 'white',
    },
});
