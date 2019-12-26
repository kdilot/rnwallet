import * as etherApi from 'etherscan-api';
import { Tx } from 'model/Tx';
import { getAddressBookMap } from './addressbook-api';

// 추후 전역 저장소에서 불러와서 사용.
const ETHSCAN_IO_API_KEY = 'ZK1MPCAYSNQACVGRRA2XT9UQH3US3UBHWH';
const ETH_NETWORK_MODE = 'ropsten';
const USER_ETH_ADDRESS = '0xbde7cd1b49eaac57373eaf5b1e9a9D588f3e456d';
const EHT_START_BLOCK = 6990000;
const ROZ_CONTRACT_ADDRESS = '0x4930765ee872f0907f14accf4ca67d958fbaab5e';

const ethClient = etherApi.init(ETHSCAN_IO_API_KEY, ETH_NETWORK_MODE, 3000);

export const getEthTxList = async (page, offset) => {
    let txList = [];
    try {
        let result = await ethClient.account.txlist(USER_ETH_ADDRESS, EHT_START_BLOCK, 'latest', page, offset, 'desc');

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
        console.log('getETH');
        let addressBookMap = await getAddressBookMap(USER_ETH_ADDRESS);
        if (Object.keys(addressBookMap).length !== 0) {
            for (let i = 0; i < txList.length; i++) {
                txList[i].nickname = txList[i].send ? addressBookMap[txList[i].to] : addressBookMap[txList[i].from];
            }
        }
        console.log('getETHADD');
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
        let result = await ethClient.account.tokentx(USER_ETH_ADDRESS, ROZ_CONTRACT_ADDRESS, EHT_START_BLOCK, 'latest', page, offset, 'desc');

        if (!result || result.message !== 'OK' || !Array.isArray(result.result)) {
            return [];
        }

        for (let i = 0; i < result.result.length; i++) {
            txList.push(Tx.formTxData(result.result[i]));
        }
        console.log('getRoz');

        let addressBookMap = await getAddressBookMap(USER_ETH_ADDRESS);
        if (Object.keys(addressBookMap).length !== 0) {
            for (let i = 0; i < txList.length; i++) {
                txList[i].nickname = txList[i].send ? addressBookMap[txList[i].to] : addressBookMap[txList[i].from];
            }
        }
        console.log('getROZADD');
    } catch (err) {
        console.log(err);
        return [];
    }

    return txList;
};

export const getTxList = async (page, offset) => {
    let txList = [];

    let ethTxList = await getEthTxList();
    let rozTxList = await getRozTxList();

    txList = txList.concat(ethTxList);
    txList = txList.concat(rozTxList);

    txList.sort((a, b) => {
        return a.ts > b.ts ? -1 : a.ts < b.ts ? 1 : 0;
    });

    return txList.slice((page - 1) * offset, page * offset);
};
