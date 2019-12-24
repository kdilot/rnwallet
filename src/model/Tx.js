import * as etherUtil from 'web3-utils';
import { div } from '../api/decimal';
import moment from 'moment';
// 추후 전역 저장소에서 불러와서 사용.
const USER_ETH_ADDRESS = '0xbde7cd1b49eaac57373eaf5b1e9a9D588f3e456d';

export class Tx {
    send; // boolean.
    hash; // string.
    nickname; // string. address book nickname.
    address; // string.
    value; // string.
    ts; // string. timestamp
    status; // number. only for ETH
    contractAddress; // string. only for ERC20

    static formTxData = (tx) => {
        if (!tx) {
            return undefined;
        }

        let formedTx;

        try {
            let send = USER_ETH_ADDRESS.toLowerCase() === tx.from ? true : false;
            let status = tx.txreceipt_status ? tx.txreceipt_status : 0;
            let isRoz = tx.contractAddress ? true : false;
            let value = isRoz ? div(tx.value, '100000000') : etherUtil.fromWei(tx.value);

            formedTx = {
                send: send,
                hash: tx.hash,
                nickname: '',
                from: tx.from,
                to: tx.to,
                value: value,
                ts: moment(Number(tx.timeStamp) * 1000).format('YY-MM-DD HH:mm:SS'),
                status: status,
                contractAddress: isRoz ? tx.contractAddress : undefined,
            };
        } catch (err) {
            console.log(err);
            return undefined;
        }

        return formedTx;
    };
}
