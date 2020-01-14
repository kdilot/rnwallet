import { StyleSheet } from 'react-native';
import { dividerLightColor } from 'constants/Color';

export default StyleSheet.create({
    panelLayout: {
        width: '100%',
    },
    titleLayout: {
        textAlign: 'center',
        fontSize: 17,
        marginVertical: 10,
    },
    dividerStyle: {
        height: 1,
        backgroundColor: dividerLightColor,
    },
});
