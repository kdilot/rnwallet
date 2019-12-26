import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

//  Actions Type
export const SETSETTING = 'locale/SETSETTING';
export const CHANGESETTING = 'locale/CHANGESETTING';

//  Actions
export const setSetting = createAction(SETSETTING);
export const changeSetting = createAction(CHANGESETTING);

// Default State
const initialState = {
    list: [],
};

export default handleActions(
    {
        [SETSETTING]: (state, action) =>
            produce(state, draft => {
                draft.list = action.payload;
            }),
        [CHANGESETTING]: (state, action) =>
            produce(state, draft => {
                const { name, value } = action.payload;
                draft.list[name] = value;
            }),
    },
    initialState,
);
