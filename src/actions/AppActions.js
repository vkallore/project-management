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
  SET_LOGGED_IN,
  CSS_CLASS_SUCCESS
} from 'constants/AppConstants'
import {
  REGISTER_SUCCESS,
  LOGGED_IN_ALREADY,
  LOGGED_IN_NOT
} from 'constants/AppMessage'
import { FORM_LOGIN, FORM_REGISTER } from 'constants/AppForms'
import { errorHandler, clearMessage, dispatchMessage } from 'actions'
import { doLogin } from 'services/auth'

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

      /**
       * Check whether user is already logged in or not
       */
      const isRedirecting = checkLoggedInAndRedirect(dispatch)
      if (isRedirecting) {
        return []
      }

      const response = await doLogin({ username, password }) //axios.post('/user/login', newFormData)

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
 * Register form
 * @param {string} username
 * @param {string} password
 */
export const register = (username, password) => {
  return async dispatch => {
    dispatch(setAjaxProcessing(true))
    let newFormData = {
      username: username,
      password: password
    }

    try {
      dispatch(clearMessage())

      /**
       * Check whether user is already logged in or not
       */
      const isRedirecting = checkLoggedInAndRedirect(dispatch)
      if (isRedirecting) {
        return []
      }

      const response = await axios.post('/user/', newFormData)

      dispatch(setAjaxProcessing(false))
      if (response.data.id) {
        dispatch({ type: RESET_FORM, formType: FORM_REGISTER })
        dispatchMessage(dispatch, REGISTER_SUCCESS, null, CSS_CLASS_SUCCESS)
      }
      return []
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
 * @param {boolean} setAsLoggedIn - Whether to set the state as
 * logged in or not
 * To prevent state update, pass it as `false`
 */
export const checkAndSetLogin = (dispatch, setAsLoggedIn = true) => {
  let isLoggedIn = false
  const userToken = getLocalStorage(USER_TOKEN)
  if (userToken !== null) {
    // TODO - Validate token
    if (setAsLoggedIn === true) {
      dispatch(setLoggedIn(true))
    }
    isLoggedIn = true
  }
  return isLoggedIn
}

/**
 * Check whether user is already logged in or not
 */
export const checkLoggedInAndRedirect = (dispatch, checkIsLoggedIn = true) => {
  const isLoggedIn = checkAndSetLogin(dispatch, false)
  let message = ''
  if (checkIsLoggedIn && isLoggedIn) {
    message = LOGGED_IN_ALREADY
  } else if (!checkIsLoggedIn && !isLoggedIn) {
    message = LOGGED_IN_NOT
  } else {
    return false
  }
  errorHandler(dispatch, message)
  setTimeout(() => {
    window.location.href = window.location.origin
  }, 3000)
  return true
}
