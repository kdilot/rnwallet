import { ETHERCHAIN_GAS_PRICE_API_URL } from 'constants/Global';

export const getGasPrice = async () => {
    try {
        let fetchResult = await fetch(ETHERCHAIN_GAS_PRICE_API_URL);
        let result = await fetchResult.json();

        return result;
    } catch (err) {
        console.log(err);
        return {};
    }
};
