import * as etherApi from 'etherscan-api';
import * as ethers from 'ethers';

import { Tx } from 'model/Tx';
import { SEND_TYPE, USER_ETH_ADDRESS, ETH_NETWORK_MODE, ETHSCAN_IO_API_KEY, ROZ_CONTRACT_ADDRESS, EHT_START_BLOCK, PROD_MODE } from 'constants/Global';

const ethClient = etherApi.init(ETHSCAN_IO_API_KEY, ETH_NETWORK_MODE, 3000);

export const formatUnits = (balance, decimal) => {
    return ethers.utils.formatUnits(balance, decimal);
};

export const formatEther = balance => {
    return ethers.utils.formatEther(balance);
};

//  Address 생성
export const fromMnemonic = mnemonic => {
    return ethers.Wallet.fromMnemonic(mnemonic);
};

//  Mnemonic 생성
export const entropyToMnemonic = () => {
    return ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16), ethers.wordlists.en);
};

export const getDefaultProvider = unit => {
    return ethers.getDefaultProvider(unit);
};

export const etherWallet = (privateKey, provider) => {
    return new ethers.Wallet(privateKey, provider);
};

export const contract = (contractAddress, abi, ethWallet) => {
    return new ethers.Contract(contractAddress, abi, ethWallet);
};

export const parseUnits = (value, type) => {
    return ethers.utils.parseUnits(value, type);
};

export const bigNumberify = value => {
    return ethers.utils.bigNumberify(value);
};

export const parseEther = value => {
    return ethers.utils.parseEther(value);
};

export const sendEth = async (privateKey, to, value, gas) => {
    if (!privateKey || !to || !value || !gas) {
        return false;
    }
    try {
        let gasPrice = parseUnits(String(gas), 'gwei');
        let gasLimit = bigNumberify(21000);
        const provider = ethers.getDefaultProvider(ETH_NETWORK_MODE);
        let nonce = await provider.getTransactionCount(USER_ETH_ADDRESS);
        let amount = parseEther(String(value));

        const transaction = { to, value: amount, gasPrice, gasLimit, nonce, data: '' };
        let ethWallet = etherWallet(privateKey, provider);
        const sign = await ethWallet.sign(transaction);
        const tx = await provider.sendTransaction(sign);
        console.log('ETH 송금이 정상적으로 완료되었습니다. txid=' + tx.hash);
    } catch (error) {
        console.log('ETH 송금 ERROR', `${error.code}\n${error.message}`);
        return false;
    }

    return true;
};

export const sendRoz = async (privateKey, to, value, gas) => {
    if (!privateKey || !to || !value || !gas) {
        return false;
    }

    try {
        let gasPrice = parseUnits(String(gas), 'gwei');
        let gasLimit = bigNumberify(2100000);
        const provider = ethers.getDefaultProvider(ETH_NETWORK_MODE);
        let ethWallet = etherWallet(privateKey, provider);
        let rozContract = contract(SEND_TYPE[ETH_NETWORK_MODE].contractAddress, SEND_TYPE[ETH_NETWORK_MODE].abi, ethWallet);
        let amount = parseUnits(String(value), 8);

        let options = { gasLimit, gasPrice };

        await rozContract.transfer(to, amount, options).then(tx => {
            console.log('ROZ 송금이 정상적으로 완료되었습니다. txid=' + tx.hash);
        });
    } catch (e) {
        console.log('ROZ 송금 중 오류가 발생되었습니다. Err=', e);
        return false;
    }

    return true;
};

export const isEnoughEthFee = async gas => {
    try {
        let parsedEthBalance = ethers.utils.parseEther(await getEthBalance());
        let estimateFee = ethers.utils.parseUnits(String(gas), 'gwei').mul(String(21000));

        if (parsedEthBalance.lt(estimateFee)) {
            return false;
        }
    } catch (err) {
        console.log('isEnoughFee' + err);
        return false;
    }

    return true;
};

export const isEnoughEth = async (value, gas) => {
    try {
        let parsedEthBalance = ethers.utils.parseEther(await getEthBalance());
        let parsedValue = ethers.utils.parseEther(String(value));
        let estimateFee = ethers.utils.parseUnits(String(gas), 'gwei').mul(String(21000));
        let parsedTotalValue = estimateFee.add(parsedValue);

        if (parsedEthBalance.lt(parsedTotalValue)) {
            return false;
        }
    } catch (err) {
        console.log('isEnoughEth', err);
        return false;
    }

    return true;
};

export const isEnoughRoz = async value => {
    try {
        let parsedRozBalance = ethers.utils.parseUnits(await getRozBalance(), 8);
        let parsedValue = ethers.utils.parseUnits(String(value), 8);

        if (parsedRozBalance.lt(parsedValue)) {
            return false;
        }
    } catch (err) {
        console.log('isEnoughRoz', err);
        return false;
    }

    return true;
};

export const getEthBalance = async () => {
    let ethBalance = 0;
    try {
        let result = await ethClient.account.balance(USER_ETH_ADDRESS);
        if (!result || result.message !== 'OK' || !result.result) {
            return 0;
        }

        ethBalance = result.result;
    } catch (err) {
        console.log(err);
        return 0;
    }

    return formatEther(ethBalance);
};

export const getRozBalance = async () => {
    let rozBalance = 0;
    try {
        let result = await ethClient.account.tokenbalance(USER_ETH_ADDRESS, '', ROZ_CONTRACT_ADDRESS);

        if (!result || result.message !== 'OK' || !result.result) {
            return 0;
        }

        rozBalance = result.result;
    } catch (err) {
        console.log(err);
        return 0;
    }

    return formatUnits(rozBalance, 8);
};

export const getEthTxList = async (page, offset) => {
    let txList = [];
    try {
        let result = await ethClient.account.txlist(USER_ETH_ADDRESS, EHT_START_BLOCK, 'latest', page, offset, 'desc');

        if (!result || result.message !== 'OK' || !Array.isArray(result.result)) {
            return [];
        }

        for (let i = 0; i < result.result.length; i++) {
            txList.push(Tx.formTxData(result.result[i]));
        }

        if (PROD_MODE === 'DEV') {
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
        let result = await ethClient.account.tokentx(USER_ETH_ADDRESS, ROZ_CONTRACT_ADDRESS, EHT_START_BLOCK, 'latest', page, offset, 'desc');

        if (!result || result.message !== 'OK' || !Array.isArray(result.result)) {
            return [];
        }

        for (let i = 0; i < result.result.length; i++) {
            txList.push(Tx.formTxData(result.result[i]));
        }

        if (PROD_MODE === 'DEV') {
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

    let ethTxList = await getEthTxList(1, 10000);
    let rozTxList = await getRozTxList(1, 10000);

    txList = txList.concat(ethTxList);
    txList = txList.concat(rozTxList);

    txList.sort((a, b) => {
        return a.time > b.time ? -1 : a.time < b.time ? 1 : 0;
    });

    if (PROD_MODE === 'DEV') {
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

    if (PROD_MODE === 'DEV') {
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

    if (PROD_MODE === 'DEV') {
        console.log('getTxListByAddress: suc');
    }
    return newTxList.slice((page - 1) * offset, page * offset);
};
