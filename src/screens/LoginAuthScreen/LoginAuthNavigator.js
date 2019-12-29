import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import FingerPrint from 'screens/LoginAuthScreen/FingerPrintScreen/FingerPrint';
import PinCode from 'screens/LoginAuthScreen/PinCodeScreen';

export default createAppContainer(
    createSwitchNavigator(
        {
            FingerPrint: {
                screen: FingerPrint,
            },
            PinCode: {
                screen: PinCode,
            },
        },
        {
            initialRouteName: 'FingerPrint',
        },
    ),
);
