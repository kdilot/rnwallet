import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import AddressBookList from 'asset/data/addressbook.json';

//  Actions Type
export const GETADDRESS = 'locale/GETADDRESS';
export const SETADDRESS = 'locale/SETADDRESS';
export const RESETADDRESS = 'locale/RESETADDRESS';

//  Actions
export const getAddressBook = createAction(GETADDRESS);
export const setAddressBook = createAction(SETADDRESS);
export const resetAddressBook = createAction(RESETADDRESS);

// Default State
const initialState = {
    list: [],
};

export default handleActions(
    {
        [GETADDRESS]: (state, action) =>
            produce(state, draft => {
                draft.list = AddressBookList;
            }),
        [SETADDRESS]: (state, action) =>
            produce(state, draft => {
                console.log(`[SET ADDRESSBOOK]`, action.payload);
            }),
        [RESETADDRESS]: (
            state,
            action, //  강제 리셋용
        ) =>
            produce(state, draft => {
                draft.list = [];
            }),
    },
    initialState,
);
