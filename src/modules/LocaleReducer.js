import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import LangFiles from 'asset/lang/LangFiles';

//  Actions Type
export const GETLOCALE = 'locale/GETLOCALE';
export const GETLOCALE_SAGA = 'locale/GETLOCALE_SAGA';
export const SETLANGUAGE = 'locale/SETLANGUAGE';
export const SETLANGUAGE_SAGA = 'locale/SETLANGUAGE_SAGA';

//  Actions
export const getLocale = createAction(GETLOCALE_SAGA);
export const setLanguage = createAction(SETLANGUAGE_SAGA);
const DEFAULT_LANGUAGE = 'en';

// Default State
const initialState = {
    locale: DEFAULT_LANGUAGE,
    defaultLocale: DEFAULT_LANGUAGE,
    lang: LangFiles[DEFAULT_LANGUAGE],
};

export default handleActions(
    {
        [GETLOCALE]: (state, action) =>
            produce(state, draft => {
                draft.locale = action.locale;
                draft.lang = LangFiles[action.locale];
            }),
        [SETLANGUAGE]: (state, action) =>
            produce(state, draft => {
                draft.locale = action.locale;
                draft.lang = LangFiles[action.locale];
            }),
    },
    initialState,
);
