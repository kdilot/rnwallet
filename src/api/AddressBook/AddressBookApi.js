import * as Global from 'constants/Global';
import * as etherjs from 'api/etherjs';
import { logUtil } from 'log/log';

const convertAddressBookListToMap = async addressBookList => {
    if (!Array.isArray(addressBookList)) {
        return {};
    }

    let addressBookMap = {};
    for (let i = 0; i < addressBookList.length; i++) {
        addressBookMap[addressBookList[i].address] = addressBookList[i].nickname;
    }

    return addressBookMap;
};

export const getAddressBookMap = async address => {
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

        if (Global.PROD_MODE === 'DEV') {
            console.log('getAddressBookMap: suc');
        }
    } catch (err) {
        logUtil.log('getAddressBookMap: ' + JSON.stringify(err));
        return {};
    }

    return addressBookMap;
};

export const setAddressBookApi = async param => {
    console.log(param, Global.USER_ETH_ADDRESS);
    try {
        const result = await fetch(Global.ROZEUS_WALLET_API_URI + '/addressbook', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address: param.address, nickname: param.nickname, owner: Global.USER_ETH_ADDRESS }), //  개인키 적용필요
        });

        let resultJson = await result.json();

        if (resultJson.code !== 200) {
            return undefined;
        }

        if (Global.PROD_MODE === 'DEV') {
            console.log('setAddressBookApi: suc');
        }

        return getAddressBookMap(Global.USER_ETH_ADDRESS);
    } catch (error) {
        logUtil.log('setAddressBookApi: ' + JSON.stringify(error));
        return { error };
    }
};

export const convertTxListToAddressBookList = async (txList, addressBookMap) => {
    let newTxList = copyArray(txList);
    etherjs.setNickname(newTxList, addressBookMap);

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

    if (Global.PROD_MODE === 'DEV') {
        console.log('convertTxListToAddressBookList: suc');
    }

    return addressBookList;
};

export const deleteAddressBook = async (owner, address) => {
    if (!owner || !address) {
        return false;
    }

    const result = await fetch(Global.ROZEUS_WALLET_API_URI + '/addressbook', {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ owner: owner, address: address }), //  개인키 적용필요
    });

    let resultJson = await result.json();

    if (resultJson.code !== 200) {
        return false;
    }

    if (Global.PROD_MODE === 'DEV') {
        console.log('deleteAddressBook: suc');
    }

    return getAddressBookMap(Global.USER_ETH_ADDRESS);
};

const copyMap = map => {
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
const copyArray = array => {
    let newAray = [];
    for (let i = 0; i < array.length; i++) {
        newAray.push(copyMap(array[i]));
    }

    return newAray;
};
