import { combineReducers } from 'redux';
import AddressBookReducer from './AddressBookReducer.js';
import LocaleReducer from './LocaleReducer.js';
import SettingReducer from './SettingReducer.js';
import TxListReducer from './TxListReducer.js';

export default combineReducers({
    AddressBookReducer,
    LocaleReducer,
    SettingReducer,
    TxListReducer,
});
