import AsyncStorage from '@react-native-community/async-storage';
import * as RNLocalize from 'react-native-localize';
import { takeEvery, put } from 'redux-saga/effects';
import { GETLOCALE, GETLOCALE_SAGA, SETLANGUAGE, SETLANGUAGE_SAGA } from 'modules/LocaleReducer';

function* getLocale() {
    let locale = null;
    yield AsyncStorage.getItem('locale').then(_locale => {
        if (!_locale) {
            locale = RNLocalize.getLocales()[0].languageCode;
            AsyncStorage.setItem('locale', locale);
        } else {
            locale = _locale;
        }
    });
    yield put({ type: GETLOCALE, locale });
}

export function* watchGetLocale() {
    yield takeEvery(GETLOCALE_SAGA, getLocale);
}

function* setLanguage(param) {
    let locale = null;
    const language = param.payload;
    locale = language !== 'ko' ? 'en' : language;
    yield AsyncStorage.setItem('locale', locale);
    yield put({ type: SETLANGUAGE, locale });
}

export function* watchSetLanguage() {
    yield takeEvery(SETLANGUAGE_SAGA, setLanguage);
}
