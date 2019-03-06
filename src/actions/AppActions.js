import axios from 'axios'

import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_AJAX_PROCESSING,
  RESET_FORM,
  CHANGE_LOGIN_REGISTER_FORM
} from '../constants/AppConstants'
import { API_ERROR_404 } from '../constants/AppMessage'

export const showModal = modalActions => {
  return dispatch => {
    dispatch({ type: SHOW_MODAL, modalActions })
  }
}

export const closeModal = modalActions => {
  return dispatch => {
    dispatch({ type: HIDE_MODAL, modalActions })
  }
}

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
        if (data.token) {
          setLocalStorage('token', data.token)
        }
      })
      .catch(error => {
        if (error.response) {
          const httpErrorCode = error.response.status

          switch (httpErrorCode) {
            case 404:
              message = API_ERROR_404
              break

            default:
              message = error.response.data.message
              break
          }
        } else if (error.request) {
          message = error.request.statusText
        } else {
          message = error.message
        }
      })
      .then(() => {
        dispatchMessage(dispatch, message)
        dispatch(setAjaxProcessing(false))
      })
  }
}

export const changeLoginRegisterForm = (formType, newState) => {
  return { type: CHANGE_LOGIN_REGISTER_FORM, newState, formType: formType }
}

const setAjaxProcessing = ajaxProcessing => {
  return { type: SET_AJAX_PROCESSING, ajaxProcessing }
}

const dispatchMessage = (dispatch, message) => {
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

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value)
}
