import { StyleSheet } from 'react-native';
import { basicColor } from 'constants/Color';

export default StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoLayout: {
        flex: 2,
        width: '100%',
        backgroundColor: basicColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentLayout: {
        flex: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});
