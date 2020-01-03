import * as ethers from 'ethers';

export const formatUnits = (balance, decimal) => {
    return ethers.utils.formatUnits(balance, decimal);
};

export const fromMnemonic = mnemonic => {
    return ethers.Wallet.fromMnemonic(mnemonic);
};
