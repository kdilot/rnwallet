import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import AsyncStorage from '@react-native-community/async-storage';

//  Actions Type
const SET_WALLET_ADDRESS = 'wallet/SET_WALLET_ADDRESS';

// const SET_SETTING_SAGA = 'wallet/SET_SETTING_SAGA';

// const LOADED_WALLETS = 'wallet/LOADED_WALLETS';
// const STORE_WALLETS = 'wallet/STORE_WALLETS';

// const STORE_WALLET_START = 'wallet/STORE_WALLET_START';
// const STORE_WALLET_OK = 'wallet/STORE_WALLET_OK';
// const STORE_WALLET_FAIL = 'wallet/STORE_WALLET_FAIL';

//  Actions
export const setWalletAddress = createAction(SET_WALLET_ADDRESS);
// export const setSetting = createAction(SET_SETTING_SAGA);

// Default State
const initialState = {
    wallets: [],
};

export default handleActions(
    {
        [SET_WALLET_ADDRESS]: (state, action) =>
            produce(state, draft => {
                AsyncStorage.setItem('wallets', JSON.stringify(action.payload));
                draft.wallets = action.payload;
            }),
    },
    initialState,
);
