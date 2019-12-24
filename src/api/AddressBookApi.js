import AddressBookJson from 'asset/data/addressbook.json';

const getAddressBookApi = async () => {
    console.log('ADDRESSBOOK API CALL');
    return await AddressBookJson;
};

const setAddressBookApi = async param => {
    // const response = await fetch(`${API_URL}/signup`, {
    //     method: "POST",
    //     headers: {
    //         Accept: "application/json",
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(param)
    // });
    // return response.json();
    // if (response) {
    //     return await this.getAddressBookApi();
    // } else {
    //     return false;
    // }
    console.log(param);
    return getAddressBookApi();
};

export { getAddressBookApi, setAddressBookApi };
