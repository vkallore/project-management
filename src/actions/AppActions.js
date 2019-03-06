import axios from 'axios'

import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_AJAX_PROCESSING,
  RESET_FORM,
  CHANGE_LOGIN_REGISTER_FORM,
  USER_TOKEN
} from '../constants/AppConstants'
import { API_ERROR_404, API_COMMON_ERROR } from '../constants/AppMessage'

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
          setLocalStorage(USER_TOKEN, data.token)
        }
        /* Reset the form */
        dispatch({ type: RESET_FORM, formType: 'login' })
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

            default:
              message = error.response.data.message
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
        dispatchModalMessage(dispatch, message)
        dispatch(setAjaxProcessing(false))
      })
  }
}

/**
 * Handle change in login/register forms
 * @param {*} formType
 * @param {*} newState
 */
export const changeLoginRegisterForm = (formType, newState) => {
  return { type: CHANGE_LOGIN_REGISTER_FORM, newState, formType: formType }
}

/**
 * Set state as ajax processing is ON/OFF
 * @param {*} ajaxProcessing
 */
const setAjaxProcessing = ajaxProcessing => {
  return { type: SET_AJAX_PROCESSING, ajaxProcessing }
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
      modalTitle: 'Login',
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
  localStorage.setItem(key, value)
}

/**
 * Get local storage
 * @param {*} key
 */
export const getLocalStorage = key => {
  return localStorage ? localStorage.getItem(key) : ''
}
