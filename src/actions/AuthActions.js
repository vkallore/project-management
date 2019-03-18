import { CSS_CLASS_SUCCESS } from 'constants/AppConstants'
import { REGISTER_SUCCESS } from 'constants/AppMessage'
import { FORM_LOGIN, FORM_REGISTER } from 'constants/AppForms'
import {
  errorHandler,
  clearMessage,
  dispatchMessage,
  setUserData,
  resetForm,
  setAjaxProcessing,
  checkLoggedInAndRedirect,
  setLoggedIn
} from 'actions'
import { doLogin, doRegister } from 'services/auth'

/**
 * Login form
 * @param {string} username
 * @param {string} password
 */
export const login = ({ username, password }) => {
  return async dispatch => {
    dispatch(setAjaxProcessing(true))
    try {
      dispatch(clearMessage())

      /**
       * Check whether user is already logged in or not
       */
      const isRedirecting = checkLoggedInAndRedirect(dispatch)
      if (isRedirecting) {
        return []
      }

      const response = await doLogin({ username, password })

      dispatch(resetForm(FORM_LOGIN))
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
export const register = ({ username, password }) => {
  return async dispatch => {
    dispatch(setAjaxProcessing(true))
    let newFormData = {
      username,
      password
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

      const response = await doRegister(newFormData)

      dispatch(setAjaxProcessing(false))
      if (response.data.id) {
        dispatch(resetForm(FORM_REGISTER))
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
 * Set as not logged in & clear user data
 */
export const logout = () => {
  return dispatch => {
    dispatch(setLoggedIn(false))
    setUserData()
  }
}
