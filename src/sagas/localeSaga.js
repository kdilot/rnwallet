import AsyncStorage from '@react-native-community/async-storage';
import * as RNLocalize from 'react-native-localize';
import { takeEvery, put } from 'redux-saga/effects';
import { GET_LOCALE, GET_LOCALE_SAGA, SET_LANGUAGE, SET_LANGUAGE_SAGA } from 'modules/LocaleReducer';
import { LANG_TYPE, DEFAULT_LANGUAGE } from 'constants/Global';

function* getLocale() {
    let locale = null;
    yield AsyncStorage.getItem('locale').then(_locale => {
        if (!_locale) {
            const localize = RNLocalize.getLocales()[0].languageCode;
            const index = LANG_TYPE.indexOf(localize);
            locale = index === -1 ? DEFAULT_LANGUAGE : localize;
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
    const locale = param.payload;
    yield AsyncStorage.setItem('locale', locale);
    yield put({ type: SET_LANGUAGE, locale });
}

export function* watchSetLanguage() {
    yield takeEvery(SET_LANGUAGE_SAGA, setLanguage);
}
