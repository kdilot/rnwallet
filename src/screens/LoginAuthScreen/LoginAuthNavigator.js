import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import FingerPrint from 'screens/LoginAuthScreen/FingerPrintScreen/FingerPrint';
import PinCode from 'screens/LoginAuthScreen/PinCodeScreen';
import IntroPage from 'screens/LoginAuthScreen/IntroPage';

export default createAppContainer(
    createSwitchNavigator(
        {
            FingerPrint: {
                screen: FingerPrint,
            },
            PinCode: {
                screen: PinCode,
            },
            Intro: {
                screen: IntroPage,
            },
        },
        {
            initialRouteName: 'FingerPrint',
        },
    ),
);
