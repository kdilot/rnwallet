import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import LangFiles from 'asset/lang/LangFiles';

//  Actions Type
export const GET_LOCALE = 'locale/GET_LOCALE';
export const SET_LANGUAGE = 'locale/SET_LANGUAGE';

//  Actions Saga
export const GET_LOCALE_SAGA = 'locale/GET_LOCALE_SAGA';
export const SET_LANGUAGE_SAGA = 'locale/SET_LANGUAGE_SAGA';

//  Actions
export const getLocale = createAction(GET_LOCALE_SAGA);
export const setLanguage = createAction(SET_LANGUAGE_SAGA);
const DEFAULT_LANGUAGE = 'en';

// Default State
const initialState = {
    locale: DEFAULT_LANGUAGE,
    defaultLocale: DEFAULT_LANGUAGE,
    lang: LangFiles[DEFAULT_LANGUAGE],
};

export default handleActions(
    {
        [GET_LOCALE]: (state, action) =>
            produce(state, draft => {
                draft.locale = action.locale;
                draft.lang = LangFiles[action.locale];
            }),
        [SET_LANGUAGE]: (state, action) =>
            produce(state, draft => {
                draft.locale = action.locale;
                draft.lang = LangFiles[action.locale];
            }),
    },
    initialState,
);
