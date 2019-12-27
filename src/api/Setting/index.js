import AsyncStorage from '@react-native-community/async-storage';
import { SETTING_MENU_LIST } from 'constants/Global';

const getSettingApi = async () => {
    const obj = {};
    await Promise.all(
        SETTING_MENU_LIST.map(async data => {
            await AsyncStorage.getItem(data.name).then(res => {
                if (data.name !== 'language') {
                    Object.assign(obj, { [data.name]: res ? res : 'off' });
                    console.log(`[SETTING GET API ${data.name} CALL]`);
                }
            });
        }),
    );
    return obj;
};

const setSettingApi = async data => {
    return await AsyncStorage.setItem(data.name, data.value);
};

export { getSettingApi, setSettingApi };
