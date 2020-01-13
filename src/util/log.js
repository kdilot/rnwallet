import crashlytics from '@react-native-firebase/crashlytics';
import { PROD_MODE } from 'constants/Global';

const log = (log, report = true) => {
    if (!log) {
        return;
    }

    if (PROD_MODE === 'DEV') {
        console.log(log);
    }

    if (!report) {
        return;
    }

    crashlytics().log(log);
};

export const logUtil = {
    log,
};
