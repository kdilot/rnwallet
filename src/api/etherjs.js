import * as ethers from 'ethers';
import { ETH_NETWORK_MODE, USER_ETH_ADDRESS, SEND_TYPE } from 'constants/Global';

export const formatUnits = (balance, decimal) => {
    return ethers.utils.formatUnits(balance, decimal);
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

        const transaction = { to, value, gasPrice, gasLimit, nonce, data: '' };
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

        let options = { gasLimit, gasPrice };

        await rozContract.transfer(to, value, options).then(tx => {
            console.log('ROZ 송금이 정상적으로 완료되었습니다. txid=' + tx.hash);
        });
    } catch (e) {
        console.log('ROZ 송금 중 오류가 발생되었습니다. Err=');
        console.log(e);
        return false;
    }

    return true;
};
