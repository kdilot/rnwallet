export const ROZEUS_WALLET_API_URI = 'https://asia-northeast1-rozeus-4321c.cloudfunctions.net/rozeuswallet';
export const ETHERCHAIN_GAS_PRICE_API_URL = 'https://www.etherchain.org/api/gasPriceOracle';

export const ETHSCAN_IO_API_KEY = 'ZK1MPCAYSNQACVGRRA2XT9UQH3US3UBHWH';
export const ETH_NETWORK_MODE = 'ropsten';
export const USER_ETH_ADDRESS = '0xBde7Cd1b49EaAc57373eaF5b1E9A9D588F3e456d';
export const EHT_START_BLOCK = 7000000;
export const ROZ_CONTRACT_ADDRESS = '0x60ac9c7a34dbe35e7392c20d9660cfb290bb485a';

export const SETTING_MENU_LIST = [
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

export const PROD_MODE = 'DEV';

export const SEND_TYPE = {
    ropsten: {
        contractAddress: '0x60ac9c7a34dbe35e7392c20d9660cfb290bb485a',
        abi: [
            // balanceOf
            {
                constant: true,
                inputs: [{ name: '_owner', type: 'address' }],
                name: 'balanceOf',
                outputs: [{ name: 'balance', type: 'uint256' }],
                type: 'function',
            },
            // decimals
            {
                constant: true,
                inputs: [],
                name: 'decimals',
                outputs: [{ name: '', type: 'uint8' }],
                type: 'function',
            },
            {
                name: 'transfer',
                type: 'function',
                inputs: [
                    {
                        name: '_to',
                        type: 'address',
                    },
                    {
                        type: 'uint256',
                        name: '_tokens',
                    },
                ],
                constant: false,
                outputs: [],
                payable: false,
            },
        ],
    },
};
