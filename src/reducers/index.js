import { combineReducers } from 'redux'

import { commonReducer } from './CommonReducers'
import { formsReducer } from './FormsReducers'

export default combineReducers({
  common: commonReducer,
  forms: formsReducer
})
