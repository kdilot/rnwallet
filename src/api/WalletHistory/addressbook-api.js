const ROZEUS_WALLET_API_URI =
    "https://asia-northeast1-rozeus-4321c.cloudfunctions.net/rozeuswallet";

const convertAddressBookListToMap = async (addressBookList) => {
    if (!Array.isArray(addressBookList)) {
        return {};
    }

    let addressBookMap = {};
    for (let i = 0; i < addressBookList.length; i++) {
        addressBookMap[addressBookList[i].address] =
            addressBookList[i].nickname;
    }

    return addressBookMap;
};

export const getAddressBookMap = async (address) => {
    if (!address) {
        return {};
    }

    let addressBookMap = {};
    try {
        let fetchResult = await fetch(
            ROZEUS_WALLET_API_URI + "/addressbookList?owner=" + address
        );
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
