import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import AsyncStorage from '@react-native-community/async-storage';
import { entropyToMnemonic } from 'api/etherjs';

//  Actions Type
export const SET_WALLET_ADDRESS = 'wallet/SET_WALLET_ADDRESS';
export const SET_MNEMONIC = 'wallet/SET_MNEMONIC';

//  Acttions Saga
export const SET_WALLET_SAGA = 'wallet/SET_WALLET_SAGA';

//  Actions
export const setWalletAddress = createAction(SET_WALLET_ADDRESS);
export const setWallet = createAction(SET_WALLET_SAGA);
export const setMnemonic = createAction(SET_MNEMONIC);

// Default State
const initialState = {
    wallets: [],
    mnemonic: ' ',
    shuffleMnemonic: [],
};

const shuffleWords = array => {
    let arr = array.slice();
    let j, x, i;
    for (i = arr.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = arr[i - 1];
        arr[i - 1] = arr[j];
        arr[j] = x;
    }
    return arr;
};

export default handleActions(
    {
        [SET_WALLET_ADDRESS]: (state, action) =>
            produce(state, draft => {
                const { wallet, async } = action.payload;
                if (async) {
                    AsyncStorage.setItem('wallets', JSON.stringify(wallet));
                }
                draft.wallets = wallet;
            }),
        [SET_MNEMONIC]: (state, action) =>
            produce(state, draft => {
                const mnemonic = entropyToMnemonic();
                draft.mnemonic = mnemonic;
                draft.shuffleMnemonic = shuffleWords(mnemonic.split(' '));
            }),
    },
    initialState,
);
