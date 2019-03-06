import { combineReducers } from 'redux'

import { commonReducer } from './CommonReducers'
import { loginRegisterReducer } from './LoginRegisterReducers'

export default combineReducers({
  common: commonReducer,
  loginRegister: loginRegisterReducer
})
