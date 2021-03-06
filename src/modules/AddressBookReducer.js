import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

//  Actions Type
export const SETADDRESS = 'address/SETADDRESS';

//  Actions
export const setAddressBook = createAction(SETADDRESS);

// Default State
const initialState = {
    map: {},
};

export default handleActions(
    {
        [SETADDRESS]: (state, action) =>
            produce(state, (draft) => {
                draft.map = action.payload;
            }),
    },
    initialState,
);
