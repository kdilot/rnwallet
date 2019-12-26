import { combineReducers } from 'redux';
import AddressBookReducer from './AddressBookReducer.js';
import LocaleReducer from './LocaleReducer.js';
import SettingReducer from './SettingReducer.js';

export default combineReducers({
    AddressBookReducer,
    LocaleReducer,
    SettingReducer,
});
