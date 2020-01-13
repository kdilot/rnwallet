import { StyleSheet } from 'react-native';
import { basicColor, dividerLightColor } from 'constants/Color';

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
    },
    itemLayout: {
        flex: 1,
        width: '100%',
        padding: 10,
    },
    itemArrowLayout: {
        position: 'absolute',
        right: 10,
    },
    dividerStyle: {
        height: 1,
        backgroundColor: dividerLightColor,
    },
});
