import { ETHERCHAIN_GAS_PRICE_API_URL } from 'constants/Global';
import { logUtil } from 'log/log';

export const getGasPrice = async () => {
    try {
        let fetchResult = await fetch(ETHERCHAIN_GAS_PRICE_API_URL);
        let result = await fetchResult.json();

        return result;
    } catch (err) {
        logUtil.log('getGasPrice: ' + JSON.stringify(err));
        return {};
    }
};
