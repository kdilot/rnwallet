import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import AsyncStorage from '@react-native-community/async-storage';

//  Actions Type
export const SET_SETTING = 'setting/SET_SETTING';
export const CHANGE_SETTING = 'setting/CHANGE_SETTING';

//  Acttions Saga
export const SET_SETTING_SAGA = 'setting/SET_SETTING_SAGA';

//  Actions
export const setSetting = createAction(SET_SETTING_SAGA);
export const changeSetting = createAction(CHANGE_SETTING);

// Default State
const initialState = {
    list: [],
};

export default handleActions(
    {
        [SET_SETTING]: (state, action) =>
            produce(state, draft => {
                draft.list = action.payload;
            }),
        [CHANGE_SETTING]: (state, action) =>
            produce(state, draft => {
                const { name, value } = action.payload;
                AsyncStorage.setItem(name, value);
                draft.list[name] = value;
            }),
    },
    initialState,
);
