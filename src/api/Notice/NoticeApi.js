import * as Global from 'constants/Global';
import { logUtil } from 'log/log';

import moment from 'moment';
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

const ROZEUS_WALLET_API_URI = Global.ROZEUS_WALLET_API_URI;
const PROD_MODE = Global.PROD_MODE;

export const getNoticeList = async () => {
	let noticeList = [];

	try {
		let fetchResult = await fetch(ROZEUS_WALLET_API_URI + '/noticeList');
		let result = await fetchResult.json();

		noticeList = result.data;

		for (let i = 0; i < noticeList.length; i++) {
			noticeList[i].inDt = moment(noticeList[i].inDt).format('YYYY.MM.DD');
		}

		if (PROD_MODE === 'DEV') {
			console.log('getNoticeList: suc');
		}
	} catch (err) {
		logUtil.log('getNoticeList: ' + JSON.stringify(err));
		return [];
	}

	return noticeList;
};
