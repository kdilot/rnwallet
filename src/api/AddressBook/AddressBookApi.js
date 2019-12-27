import * as Global from 'constants/Global';
import * as etherApi from 'api/WalletHistory/etherscan-api';

const convertAddressBookListToMap = async (addressBookList) => {
    if (!Array.isArray(addressBookList)) {
        return {};
    }

    let addressBookMap = {};
    for (let i = 0; i < addressBookList.length; i++) {
        addressBookMap[addressBookList[i].address] = addressBookList[i].nickname;
    }

    return addressBookMap;
};

export const getAddressBookMap = async (address) => {
    if (!address) {
        return {};
    }

    let addressBookMap = {};
    try {
        let fetchResult = await fetch(Global.ROZEUS_WALLET_API_URI + '/addressbookList?owner=' + address);
        let result = await fetchResult.json();

        if (result.code !== 200 || !Array.isArray(result.data)) {
            return {};
        }

        addressBookMap = convertAddressBookListToMap(result.data);
    } catch (err) {
        console.log(err);
        return {};
    }

    return addressBookMap;
};

export const setAddressBookApi = async (param) => {
    try {
        const response = await fetch(Global.ROZEUS_WALLET_API_URI + '/addressbook', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.assign(param, { owner: Global.USER_ETH_ADDRESS })), //  개인키 적용필요
        });
        return response.json().then((res) => {
            if (res.code === 200) {
                return getAddressBookMap(Global.USER_ETH_ADDRESS);
            }
        });
    } catch (e) {
        console.log(`[ADDRESSBOOK SET API] ${e}`);
        return { error: e };
    }
};

export const convertTxListToAddressBookList = async (txList) => {
    let newTxList = copyArray(txList);
    let addressBookMap = await getAddressBookMap(Global.USER_ETH_ADDRESS);
    etherApi.setNickname(newTxList, addressBookMap);

    let addressMap = {};

    for (let i = 0; i < newTxList.length; i++) {
        if (!newTxList[i].to || !newTxList[i].from || newTxList[i].from === '0x0000000000000000000000000000000000000000') {
            continue;
        }

        if (newTxList[i].send) {
            addressMap[newTxList[i].to] = newTxList[i].nickname;
        } else {
            addressMap[newTxList[i].from] = newTxList[i].nickname;
        }
    }

    let addressBookList = [];
    let addressBookKeys = Object.keys(addressMap);
    for (let i = 0; i < addressBookKeys.length; i++) {
        addressBookList.push({
            nickname: addressMap[addressBookKeys[i]],
            address: addressBookKeys[i],
        });
    }

    return addressBookList;
};

const copyMap = (map) => {
    if (!map) {
        return map;
    }

    var newMap = map.constructor();

    for (var attr in map) {
        if (map.hasOwnProperty(attr)) {
            newMap[attr] = map[attr];
        }
    }

    return newMap;
};
const copyArray = (array) => {
    let newAray = [];
    for (let i = 0; i < array.length; i++) {
        newAray.push(copyMap(array[i]));
    }

    return newAray;
};
