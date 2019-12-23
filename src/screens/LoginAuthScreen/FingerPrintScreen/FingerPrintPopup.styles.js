import { basicColor, whiteColor, dividerDarkColor } from 'constants/Color';

export default {
    container: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: basicColor,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: '50%',
        backgroundColor: whiteColor,
        zIndex: 10,
    },
    logo: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 5,
    },
    message: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    description: error => ({
        textAlign: 'center',
        color: error ? 'red' : dividerDarkColor,
        fontSize: 18,
        marginHorizontal: 20,
    }),
    buttonContainer: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 30,
    },
    buttonText: {
        color: basicColor,
        fontSize: 15,
        fontWeight: 'bold',
    },
};
