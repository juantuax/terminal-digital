import { combineReducers } from 'redux';
import authReducers from './authReducers';
import globalReducers from './globalReducers';

export default combineReducers({
    auth: authReducers,
    global: globalReducers
});