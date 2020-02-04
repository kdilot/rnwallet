import * as etherjs from 'api/etherjs';
import moment from 'moment';
import { USER_ETH_ADDRESS, ROZ_CONTRACT_ADDRESS } from 'constants/Global';
import { logUtil } from 'log/log';

require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');

export class Tx {
    send; // boolean.
    hash; // string.
    nickname; // string. address book nickname.
    address; // string.
    value; // string.
    ts; // string. timestamp
    status; // number. only for ETH
    contractAddress; // string. only for ERC20
    isRoz; // boolean.

    static formTxData = tx => {
        if (!tx) {
            return undefined;
        }

        let formedTx;

        try {
            let isRoz = tx.contractAddress ? true : false;
            let send = USER_ETH_ADDRESS.toLowerCase() === tx.from ? true : false;

            formedTx = {
                send: send,
                // circleColor: send ? minusColor : plusColor,
                // lineColor: send ? minusColor : plusColor,
                hash: tx.hash,
                nickname: '',
                from: tx.from,
                to: tx.to,
                isRoz: isRoz,
                value: isRoz ? etherjs.formatUnits(tx.value, 8) : etherjs.formatUnits(tx.value, 18),
                time: moment(Number(tx.timeStamp) * 1000).format('YY-MM-DD HH:mm:ss'),
                status: isRoz ? 1 : Number(tx.txreceipt_status),
                contractAddress: isRoz ? tx.contractAddress : undefined,
            };
        } catch (err) {
            logUtil.log('formTxData: ' + JSON.stringify(err));
            return undefined;
        }

        return formedTx;
    };

    static formPendingTxData = tx => {
        if (!tx) {
            return undefined;
        }

        let formedPendingTx;

        try {
            let isRoz = tx.to === ROZ_CONTRACT_ADDRESS ? true : false;

            let decodedInputData;
            if (isRoz) {
                decodedInputData = etherjs.decodeInputData(tx.input);
            }

            formedPendingTx = {
                send: true, // pending data is only sending.
                // circleColor: minusColor,
                // lineColor: minusColor,
                hash: tx.hash,
                nickname: '',
                from: tx.from,
                to: isRoz ? decodedInputData.address : tx.to,
                isRoz: isRoz,
                value: isRoz ? decodedInputData.amount : etherjs.formatUnits(tx.value, 18),
                time: '',
                status: 2,
                contractAddress: isRoz ? tx.to : undefined,
            };
        } catch (err) {
            console.log(err);
            return undefined;
        }

        return formedPendingTx;
    };
}
