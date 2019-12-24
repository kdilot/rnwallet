import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

//  Actions Type
export const SETADDRESS = 'locale/SETADDRESS';

//  Actions
export const setAddressBook = createAction(SETADDRESS);

// Default State
const initialState = {
    list: [],
};

export default handleActions(
    {
        [SETADDRESS]: (state, action) =>
            produce(state, draft => {
                draft.list = action.payload;
            }),
    },
    initialState,
);
