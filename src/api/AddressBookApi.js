const API_URL = 'https://asia-northeast1-rozeus-4321c.cloudfunctions.net/rozeuswallet';
const USER_ETH_ADDRESS = '0xbde7cd1b49eaac57373eaf5b1e9a9D588f3e456d';

const getAddressBookApi = async () => {
    try {
        const response = await fetch(`${API_URL}/addressbookList?owner=${USER_ETH_ADDRESS}`);
        console.log('[ADDRESSBOOK GET API CALL]');
        return await response.json();
    } catch (e) {
        console.log(`[ADDRESSBOOK GET API] ${e}`);
        return { error: e };
    }
};

const setAddressBookApi = async param => {
    try {
        const response = await fetch(`${API_URL}/addressbook`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.assign(param, { owner: USER_ETH_ADDRESS })), //  개인키 적용필요
        });
        return response.json().then(res => {
            if (res.code === 200) {
                return getAddressBookApi();
            }
        });
    } catch (e) {
        console.log(`[ADDRESSBOOK SET API] ${e}`);
        return { error: e };
    }
};

export { getAddressBookApi, setAddressBookApi };
