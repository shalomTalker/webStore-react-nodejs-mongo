import { combineReducers } from 'redux';
import authReducer from './authReducer'
import usersReducer from './usersReducer'
import storeReducer from './storeReducer'
import dataReducer from './dataReducer'
import dialogReducer from './dialogReducer'
import messageReducer from './messageReducer'
import formReducer from './formReducer'
import manageReducer from './manageReducer'

export default combineReducers({
    message: messageReducer,
    auth: authReducer,
    users: usersReducer,
    store: storeReducer,
    data: dataReducer,
    dialog: dialogReducer,
    manage: manageReducer,
    form: formReducer
})