import { combineReducers } from 'redux';
import AddressBookReducer from './AddressBookReducer.js';
import LocaleReducer from './LocaleReducer.js';

export default combineReducers({
    AddressBookReducer,
    LocaleReducer,
});
