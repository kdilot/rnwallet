import { takeEvery, put } from 'redux-saga/effects';
import { SET_SETTING_SAGA, SET_SETTING } from 'modules/SettingReducer';
import { SETTING_MENU_LIST } from 'constants/Global';
import AsyncStorage from '@react-native-community/async-storage';

function* setSetting() {
    const payload = {};
    yield Promise.all(
        SETTING_MENU_LIST.map(async data => {
            await AsyncStorage.getItem(data.name).then(res => {
                if (data.name !== 'language') {
                    Object.assign(payload, { [data.name]: res ? res : 'off' });
                }
            });
        }),
    );
    console.log(`[GET SETTING]`);
    yield put({ type: SET_SETTING, payload });
}

export function* watchSetSetting() {
    yield takeEvery(SET_SETTING_SAGA, setSetting);
}
