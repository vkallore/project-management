import {
  RESET_FORM,
  CHANGE_LOGIN_REGISTER_FORM
} from '../constants/AppConstants'

const initialState = {
  login: {
    username: '',
    password: ''
  },
  register: {
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  }
}

export const loginRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_FORM:
      return resetForm(state, action)
    case CHANGE_LOGIN_REGISTER_FORM:
      return changeLoginRegisterForm(state, action)
    default:
      return state
  }
}

const resetForm = (state, action) => {
  switch (action.formType) {
    case 'login':
      return {
        ...state,
        login: initialState.login
      }
    case 'register':
      return {
        ...state,
        register: initialState.register
      }
    default:
      break
  }
}

const changeLoginRegisterForm = (state, action) => {
  switch (action.formType) {
    case 'login':
      return {
        ...state,
        login: { ...state.login, ...action.newState }
      }
    case 'register':
      return {
        ...state,
        register: { ...state.register, ...action.newState }
      }
    default:
      return state
  }
}
