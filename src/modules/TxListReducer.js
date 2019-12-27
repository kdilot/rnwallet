import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

//  Actions Type
export const SET_ALL_TXLIST = 'txList/SETALLTXLIST';

//  Actions
export const setAllTxList = createAction(SET_ALL_TXLIST);

// Default State
const initialState = {
    list: [],
};

export default handleActions(
    {
        [SET_ALL_TXLIST]: (state, action) =>
            produce(state, (draft) => {
                draft.list = action.payload;
            }),
    },
    initialState,
);
