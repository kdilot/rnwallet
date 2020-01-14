import AsyncStorage from '@react-native-community/async-storage';
import * as RNLocalize from 'react-native-localize';
import { takeEvery, put } from 'redux-saga/effects';
import { GET_LOCALE, GET_LOCALE_SAGA, SET_LANGUAGE, SET_LANGUAGE_SAGA } from 'modules/LocaleReducer';

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
    yield put({ type: GET_LOCALE, locale });
}

export function* watchGetLocale() {
    yield takeEvery(GET_LOCALE_SAGA, getLocale);
}

function* setLanguage(param) {
    let locale = null;
    const language = param.payload;
    locale = language;
    yield AsyncStorage.setItem('locale', locale);
    yield put({ type: SET_LANGUAGE, locale });
}

export function* watchSetLanguage() {
    yield takeEvery(SET_LANGUAGE_SAGA, setLanguage);
}
