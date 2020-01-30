import * as Global from 'constants/Global';
import { logUtil } from 'log/log';

const ROZEUS_WALLET_API_URI = Global.ROZEUS_WALLET_API_URI;
const PROD_MODE = Global.PROD_MODE;

export const getFaqList = async () => {
    let faqList = [];

    try {
        let fetchResult = await fetch(ROZEUS_WALLET_API_URI + '/faqList');
        let result = await fetchResult.json();        

        faqList = result.data;

        if (PROD_MODE === 'DEV') {
            console.log('getFaqList: suc');
        }
    } catch (err) {
        logUtil.log('getFaqList: ' + JSON.stringify(err));
        return [];
    }

    return faqList;
};