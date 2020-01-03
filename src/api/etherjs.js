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
