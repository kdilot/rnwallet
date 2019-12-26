import AsyncStorage from '@react-native-community/async-storage';

const MENU_LIST = [
    {
        name: 'push',
    },
    {
        name: 'pin',
    },
    {
        name: 'fingerprint',
    },
    {
        name: 'language',
    },
];

const getSettingApi = async () => {
    const obj = {};
    await Promise.all(
        MENU_LIST.map(async data => {
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

export { getSettingApi, setSettingApi, MENU_LIST };
