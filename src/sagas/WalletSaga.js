import { takeEvery, put } from 'redux-saga/effects';
import { SET_WALLET_SAGA, SET_WALLET_ADDRESS } from 'modules/WalletReducer';
import AsyncStorage from '@react-native-community/async-storage';

function* setWalletSaga() {
    let payload = {};
    yield AsyncStorage.getItem('wallets').then(res => {
        payload.wallet = JSON.parse(res);
        console.log('[GET WALLETS]');
    });
    yield put({ type: SET_WALLET_ADDRESS, payload });
}

export function* watchSetWallet() {
    yield takeEvery(SET_WALLET_SAGA, setWalletSaga);
}
