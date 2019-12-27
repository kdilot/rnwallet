import { combineReducers } from 'redux';
import AddressBookReducer from './AddressBookReducer';
import LocaleReducer from './LocaleReducer';
import SettingReducer from './SettingReducer';
import TxListReducer from './TxListReducer';

export default combineReducers({
    AddressBookReducer,
    LocaleReducer,
    SettingReducer,
    TxListReducer,
});
