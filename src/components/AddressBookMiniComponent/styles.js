import { StyleSheet } from 'react-native';
import { dividerLightColor, dividerDarkColor } from 'constants/Color';

export default StyleSheet.create({
    container: {
        // alignSelf: 'flex-start',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: dividerDarkColor,
    },
    addressBookTextStyle: {
        padding: 10,
        flex: 1,
        width: '100%',
    },
    dividerStyle: {
        height: 1,
        backgroundColor: dividerLightColor,
    },
});
