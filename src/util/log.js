import crashlytics from '@react-native-firebase/crashlytics';
import { PROD_MODE } from 'constants/Global'

const log = (log) => {
    if (!log) {
        return;
    }

    if (PROD_MODE === 'DEV') {
        console.log(log);        
    }

    crashlytics().log(log);
};

export const logUtil = {
    log,
};
