import axios from 'axios'

import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_AJAX_PROCESSING,
  RESET_FORM,
  CHANGE_FORM,
  USER_TOKEN,
  USER_TOKEN_EXPIRY,
  USER_REFRESH_TOKEN,
  SET_LOGGED_IN
} from 'constants/AppConstants'
import { FORM_LOGIN } from 'constants/AppForms'
import { errorHandler, clearMessage } from 'actions'

/**
 * Show the modal
 * @param {*} modalActions
 */
export const showModal = modalActions => {
  return dispatch => {
    dispatch({ type: SHOW_MODAL, modalActions })
  }
}

/**
 * Close the modal
 * @param {*} modalActions
 */
export const closeModal = modalActions => {
  return dispatch => {
    dispatch({ type: HIDE_MODAL, modalActions })
  }
}

/**
 * Login form
 * @param {string} username
 * @param {string} password
 */
export const login = (username, password) => {
  return async dispatch => {
    dispatch(setAjaxProcessing(true))
    let newFormData = {
      username: username,
      password: password
    }
    try {
      dispatch(clearMessage())
      const response = await axios.post('/user/login', newFormData)

      dispatch({ type: RESET_FORM, formType: FORM_LOGIN })
      dispatch(setLoggedIn(true))
      dispatch(setAjaxProcessing(false))
      return response.data
    } catch (error) {
      errorHandler(dispatch, error, true)
      dispatch(setAjaxProcessing(false))
      return []
    }
  }
}

/**
 * Handle change in login/register forms
 * @param {*} formType
 * @param {*} newState
 */
export const changeForm = (formType, newState) => {
  return { type: CHANGE_FORM, newState, formType: formType }
}

/**
 * Set state as ajax processing is ON/OFF
 * @param {boolean} ajaxProcessing
 */
const setAjaxProcessing = ajaxProcessing => {
  return { type: SET_AJAX_PROCESSING, ajaxProcessing }
}

/**
 * Set state as logged in TRUE/FALSE
 * @param {boolean} loggedIn
 */
export const setLoggedIn = loggedIn => {
  return { type: SET_LOGGED_IN, loggedIn }
}

/**
 * Set as not logged in & clear user data
 */
export const logout = () => {
  return dispatch => {
    dispatch(setLoggedIn(false))
    setUserData()
  }
}

/**
 * Set user data to local storage
 * @param  {...any} args
 */
export const setUserData = (...args) => {
  const [token, tokenExpiry, refreshToken] = args
  setLocalStorage(USER_TOKEN, token)
  setLocalStorage(USER_TOKEN_EXPIRY, tokenExpiry)
  setLocalStorage(USER_REFRESH_TOKEN, refreshToken)
}

// /**
//  * Dispatch modal message
//  * @param {*} dispatch
//  * @param {*} message
//  */
// const dispatchModalMessage = (dispatch, message) => {
//   dispatch({
//     type: SHOW_MODAL,
//     modal: {
//       showModal: true,
//       backDrop: true,
//       modalTitle: '',
//       modalBody: message,
//       primaryBtnText: 'Okay'
//     }
//   })
// }

/**
 * Set local storage
 * @param {*} key
 * @param {*} value
 */
const setLocalStorage = (key, value) => {
  if (value !== null && value !== undefined) {
    localStorage.setItem(key, value)
  } else {
    localStorage.removeItem(key)
  }
}

/**
 * Get local storage
 * @param {*} key
 */
export const getLocalStorage = key => {
  return localStorage ? localStorage.getItem(key) : ''
}

/**
 * Check and set as logged in
 * @param {object} dispatch
 */
export const checkAndSetLogin = dispatch => {
  const userToken = getLocalStorage(USER_TOKEN)
  if (userToken !== null) {
    // TODO - Validate token
    dispatch(setLoggedIn(true))
  }
}
