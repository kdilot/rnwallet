import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import AsyncStorage from '@react-native-community/async-storage';

//  Actions Type
const SET_WALLET_ADDRESS = 'wallet/SET_WALLET_ADDRESS';

//  Acttions Saga
const SET_WALLET_SAGA = 'wallet/SET_WALLET_SAGA';

//  Actions
export const setWalletAddress = createAction(SET_WALLET_ADDRESS);
export const setWallet = createAction(SET_WALLET_SAGA);

// Default State
const initialState = {
    wallets: [],
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
    },
    initialState,
);
