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
  SHOW_MESSAGE,
  CSS_CLASS_DANGER
} from '../constants/AppConstants'
import { API_ERROR_404, API_COMMON_ERROR } from '../constants/AppMessage'
import { FORM_LOGIN } from '../constants/AppForms'

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
 * @param {*} username
 * @param {*} password
 */
export const login = (username, password) => {
  let message = ''
  let detailedMessage = []
  return dispatch => {
    dispatch(setAjaxProcessing(true))
    let newFormData = {
      username: username,
      password: password
    }
    axios
      .post('/user/login', newFormData)
      .then(response => {
        message = response.message || ''
        const data = response.data
        /* Store the token in localstorage */
        if (data.token) {
          dispatch(setLoggedIn(true))
          setUserData(data.token, data.tokenExpiry, data.refreshToken)
        }
        /* Reset the form */
        dispatch({ type: RESET_FORM, formType: FORM_LOGIN })
      })
      .catch(error => {
        if (error.response) {
          /* Handle response */
          const httpErrorCode = error.response.status

          /* Handle error code for 404 & others seperately */
          switch (httpErrorCode) {
            case 404:
              message = API_ERROR_404
              break

            case 500:
              message = API_COMMON_ERROR
              break

            default:
              message = error.response.data.message
              detailedMessage = error.response.data.data
              break
          }
        } else if (error.request) {
          /* Handle Request Timeout */
          message = error.request.statusText
        } else {
          /* Handle any other error */
          message = error.message || API_COMMON_ERROR
        }
      })
      .then(() => {
        dispatchMessage(dispatch, message, detailedMessage, CSS_CLASS_DANGER)
      })
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
 * @param {*} ajaxProcessing
 */
const setAjaxProcessing = ajaxProcessing => {
  return { type: SET_AJAX_PROCESSING, ajaxProcessing }
}

/**
 * Set state as logged in TRUE/FALSE
 * @param {*} loggedIn
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

const buildDetailedMessage = detailedMessage =>
  new Promise(resolve => {
    let strDetailedMessage = ''
    if (typeof detailedMessage === 'array') {
      detailedMessage.forEach(message => {
        strDetailedMessage += `\n - ${message}`
      })
    }
    resolve(strDetailedMessage)
  })

/**
 * Set user data to local storage
 * @param  {...any} args
 */
const setUserData = (...args) => {
  const [token, tokenExpiry, refreshToken] = args
  setLocalStorage(USER_TOKEN, token)
  setLocalStorage(USER_TOKEN_EXPIRY, tokenExpiry)
  setLocalStorage(USER_REFRESH_TOKEN, refreshToken)
}

/**
 * Dispatch message
 * @param {*} dispatch
 * @param {*} message
 */
const dispatchMessage = async (
  dispatch,
  message,
  detailedMessage,
  messageType
) => {
  message += await buildDetailedMessage(detailedMessage)
  dispatch({
    type: SHOW_MESSAGE,
    apiResponse: message,
    apiResponseType: messageType
  })

  dispatch(setAjaxProcessing(false))
}

/**
 * Dispatch modal message
 * @param {*} dispatch
 * @param {*} message
 */
const dispatchModalMessage = (dispatch, message) => {
  dispatch({
    type: SHOW_MODAL,
    modal: {
      showModal: true,
      backDrop: true,
      modalTitle: '',
      modalBody: message,
      primaryBtnText: 'Okay'
    }
  })
}

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
