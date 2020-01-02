import * as etherApi from 'etherscan-api';
import { Tx } from 'model/Tx';
import * as Global from 'constants/Global';

const ethClient = etherApi.init(Global.ETHSCAN_IO_API_KEY, Global.ETH_NETWORK_MODE, 3000);

export const getEthBalance = async () => {
    let ethBalance = 0;
    try {
        let result = await ethClient.account.balance(Global.USER_ETH_ADDRESS);
        if (!result || result.message !== 'OK' || !result.result) {
            return 0;
        }

        ethBalance = result.result;
    } catch (err) {
        console.log(err);
    }

    return ethBalance;
};

export const getRozBalance = async () => {
    let rozBalance = 0;
    try {
        let result = await ethClient.account.tokenbalance(Global.USER_ETH_ADDRESS, '', '0x60ac9c7a34dbe35e7392c20d9660cfb290bb485a');

        if (!result || result.message !== 'OK' || !result.result) {
            return 0;
        }

        rozBalance = result.result;
    } catch (err) {
        console.log(err);
    }

    return rozBalance;
};

export const getEthTxList = async (page, offset) => {
    let txList = [];
    try {
        let result = await ethClient.account.txlist(Global.USER_ETH_ADDRESS, Global.EHT_START_BLOCK, 'latest', page, offset, 'desc');

        if (!result || result.message !== 'OK' || !Array.isArray(result.result)) {
            return [];
        }
        //  타임라인 색상
        result.result.circleColor = '#009688';
        result.result.lineColor = '#009688';
        result.result.time = null;

        for (let i = 0; i < result.result.length; i++) {
            txList.push(Tx.formTxData(result.result[i]));
        }

        if (Global.PROD_MODE === 'DEV') {
            console.log('getEthTxList: suc');
        }
    } catch (err) {
        console.log(err);
        return [];
    }

    return txList;
};

// response 확인 필요.
export const getRozTxList = async (page, offset) => {
    let txList = [];
    try {
        let result = await ethClient.account.tokentx(Global.USER_ETH_ADDRESS, Global.ROZ_CONTRACT_ADDRESS, Global.EHT_START_BLOCK, 'latest', page, offset, 'desc');

        if (!result || result.message !== 'OK' || !Array.isArray(result.result)) {
            return [];
        }

        for (let i = 0; i < result.result.length; i++) {
            txList.push(Tx.formTxData(result.result[i]));
        }

        if (Global.PROD_MODE === 'DEV') {
            console.log('getRozTxList: suc');
        }
    } catch (err) {
        console.log(err);
        return [];
    }

    return txList;
};

// txList를 redux store에 넣기 위해 storeFunc을 직접 받음.
export const getTxList = async (page, offset) => {
    let txList = [];

    let ethTxList = await getEthTxList();
    let rozTxList = await getRozTxList();

    txList = txList.concat(ethTxList);
    txList = txList.concat(rozTxList);

    txList.sort((a, b) => {
        return a.ts > b.ts ? -1 : a.ts < b.ts ? 1 : 0;
    });

    if (Global.PROD_MODE === 'DEV') {
        console.log('getTxList: suc');
    }

    return txList.slice((page - 1) * offset, page * offset);
};

export const setNickname = (txList, addressBookMap) => {
    if (!Array.isArray(txList) || txList.length === 0 || !addressBookMap || addressBookMap === {}) {
        return;
    }

    for (let i = 0; i < txList.length; i++) {
        txList[i].nickname = txList[i].send ? addressBookMap[txList[i].to] : addressBookMap[txList[i].from];
    }

    if (Global.PROD_MODE === 'DEV') {
        console.log('setNickname: suc');
    }
};

export const getTxListByAddress = async (page, offset, address) => {
    let txList = await getTxList(1, 10000);

    let newTxList = [];

    for (let i = 0; i < txList.length; i++) {
        if (txList[i].from === address || txList[i].to === address) {
            newTxList.push(txList[i]);
        }
    }

    if (Global.PROD_MODE === 'DEV') {
        console.log('getTxListByAddress: suc');
    }
    return newTxList.slice((page - 1) * offset, page * offset);
};
