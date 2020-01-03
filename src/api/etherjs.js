import * as ethers from 'ethers';

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
