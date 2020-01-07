import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import AsyncStorage from '@react-native-community/async-storage';

//  Actions Type
export const SET_ALL_TXLIST = 'txList/SET_ALL_TXLIST';
export const SET_PENDING_TXLIST = 'txList/SET_PENDING_TXLIST';
export const ADD_PENDING_TXLIST = 'txList/ADD_PENDING_TXLIST';
export const REMOVE_PENDING_TXLIST = 'txList/REMOVE_PENDING_TXLIST';

//  Actions
export const setAllTxList = createAction(SET_ALL_TXLIST);
export const setPendingTxList = createAction(SET_PENDING_TXLIST);
export const addPendingTxList = createAction(ADD_PENDING_TXLIST);
export const removePendingTxList = createAction(REMOVE_PENDING_TXLIST);

// Default State
const initialState = {
    list: [],
    pendingTxList: [],
};

export default handleActions(
    {
        [SET_ALL_TXLIST]: (state, action) =>
            produce(state, draft => {
                draft.list = action.payload;
            }),
        [SET_PENDING_TXLIST]: (state, action) =>
            produce(state, draft => {
                draft.pendingTxList = action.payload;
            }),
        [ADD_PENDING_TXLIST]: (state, action) =>
            produce(state, draft => {
                const { txId } = action.payload;
                const pendingList = state.pendingTxList.concat(txId);
                AsyncStorage.setItem('pendingTxList', JSON.stringify(pendingList));
                draft.pendingTxList = pendingList;
            }),
        [REMOVE_PENDING_TXLIST]: (state, action) =>
            produce(state, draft => {
                const { txId } = action.payload;
                const pendingList = state.pendingTxList.filter(id => id !== txId);
                AsyncStorage.setItem('pendingTxList', JSON.stringify(pendingList));
                draft.pendingTxList = pendingList;
            }),
    },
    initialState,
);
