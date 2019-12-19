import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import LangFiles from 'asset/LangFiles';

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
    t: LangFiles[DEFAULT_LANGUAGE],
};

export default handleActions(
    {
        [GETLOCALE]: (state, action) =>
            produce(state, draft => {
                draft.locale = action.locale;
                draft.t = LangFiles[action.locale];
            }),
        [SETLANGUAGE]: (state, action) =>
            produce(state, draft => {
                draft.t = LangFiles[action.locale];
            }),
    },
    initialState,
);
