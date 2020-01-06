import { takeEvery, put } from 'redux-saga/effects';
import { SET_WALLET_SAGA, SET_WALLET_ADDRESS } from 'modules/WalletReducer';
import * as Global from 'constants/Global';
import AsyncStorage from '@react-native-community/async-storage';

function* setWalletSaga() {
    let payload = {};
    yield AsyncStorage.getItem('walletAddress').then(res => {
        payload.walletAddress = res;
        //  개인 지갑주소 GLOBAL 값 변경
        Global.USER_ETH_ADDRESS = res;
        console.log('[GET WALLETS]');
    });
    yield put({ type: SET_WALLET_ADDRESS, payload });
}

export function* watchSetWallet() {
    yield takeEvery(SET_WALLET_SAGA, setWalletSaga);
}
