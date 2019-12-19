import { all, fork } from 'redux-saga/effects';
import { watchGetLocale, watchSetLanguage } from './localeSaga';

export function* rootSaga() {
    yield all([fork(watchGetLocale), fork(watchSetLanguage)]);
}
