import { Dimensions, StyleSheet } from 'react-native';
import { basicColor, whiteColor } from 'constants/Color';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: basicColor,
    },
    subheading: {
        color: whiteColor,
        fontSize: 12,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 30,
    },
    fingerprint: {
        padding: 20,
        marginVertical: 30,
    },
    errorMessage: {
        color: whiteColor,
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 10,
        marginTop: 30,
    },
    popup: {
        width: width * 0.8,
    },
});
