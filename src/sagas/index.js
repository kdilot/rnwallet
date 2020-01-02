import { all, fork } from 'redux-saga/effects';
import { watchGetLocale, watchSetLanguage } from './localeSaga';
import { watchSetSetting } from './SettingSaga';
import { watchSetWallet } from './WalletSaga';

export function* rootSaga() {
    yield all([fork(watchGetLocale), fork(watchSetLanguage), fork(watchSetSetting), fork(watchSetWallet)]);
}
