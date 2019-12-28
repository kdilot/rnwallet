import { all, fork } from 'redux-saga/effects';
import { watchGetLocale, watchSetLanguage } from './localeSaga';
import { watchSetSetting } from './SettingSaga';

export function* rootSaga() {
    yield all([fork(watchGetLocale), fork(watchSetLanguage), fork(watchSetSetting)]);
}
