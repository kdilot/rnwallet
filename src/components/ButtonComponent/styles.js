import { StyleSheet } from 'react-native';
import { dividerDarkColor, whiteColor } from 'constants/Color';

export default StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    disText: {
        color: whiteColor,
    },
    disContainer: {
        backgroundColor: dividerDarkColor,
    },
    buttonLayout: ({ color, outline, radius }) => ({
        width: '100%',
        padding: 8,
        backgroundColor: outline ? whiteColor : color,
        borderWidth: outline ? 1 : 0,
        borderColor: outline ? color : whiteColor,
        borderRadius: radius,
    }),
    buttonTextLayout: ({ color, outline }) => ({
        color: outline ? color : whiteColor,
    }),
});
