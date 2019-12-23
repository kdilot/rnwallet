import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import AddressBookList from 'asset/data/addressbook.json';

//  Actions Type
export const GETADDRESS = 'locale/GETADDRESS';
export const SETADDRESS = 'locale/SETADDRESS';

//  Actions
export const getAddressBook = createAction(GETADDRESS);
export const setAddressBook = createAction(SETADDRESS);

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
                draft.list = [];
                console.log(`[SET ADDRESSBOOK]`, action.payload);
                draft.list = AddressBookList;
            }),
    },
    initialState,
);
