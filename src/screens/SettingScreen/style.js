import { StyleSheet } from 'react-native';
import { dividerLightColor } from 'constants/Color';

export default StyleSheet.create({
    panelLayout: {
        flex: 1,
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
