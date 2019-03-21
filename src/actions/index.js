import { isTokenAlive, getFreshToken } from 'services/auth'

import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_AJAX_PROCESSING,
  CHANGE_FORM,
  USER_TOKEN,
  USER_TOKEN_EXPIRY,
  USER_REFRESH_TOKEN,
  SET_LOGGED_IN,
  SHOW_MESSAGE,
  CSS_CLASS_DANGER,
  CLEAR_MESSAGE,
  RESET_FORM
} from 'constants/AppConstants'
import {
  API_ERROR_404,
  API_COMMON_ERROR,
  LOGGED_IN_ALREADY,
  LOGGED_IN_NOT
} from 'constants/AppMessage'

/**
 * Common error hander for API calls
 * @param {*} error
 */
export const errorHandler = (dispatch, error, allowMessageClose = false) => {
  let message = ''
  let detailedMessage = []
  try {
    if (error.response) {
      /* Handle response */
      const httpErrorCode = error.response.status

      /* Handle error code for 404 & others seperately */
      switch (httpErrorCode) {
        case 404:
          message = API_ERROR_404
          break

        case 500:
          try {
            message = error.response.data.message
            detailedMessage = error.response.data.data
          } catch (err) {
            message = API_COMMON_ERROR
          }
          break

        default:
          message = error.response.data.message
          detailedMessage = error.response.data.data
          break
      }
    } else if (error.request) {
      /* Handle Request Timeout */
      message = error.request.statusText
    } else if (error.message) {
      message = error.message
      /* Handle any other error */
    } else if (typeof error === 'string') {
      message = error
    }
    if (message === '' || message === undefined) {
      message = API_COMMON_ERROR
    }
  } catch (err) {
    message = API_COMMON_ERROR
  }

  dispatchMessage(
    dispatch,
    message,
    detailedMessage,
    CSS_CLASS_DANGER,
    allowMessageClose
  )
}

/**
 * Dispatch message
 * @param {*} dispatch
 * @param {*} message
 */
export const dispatchMessage = async (
  dispatch,
  message,
  detailedMessage,
  messageType,
  allowMessageClose = false
) => {
  message += await buildDetailedMessage(detailedMessage)
  dispatch({
    type: SHOW_MESSAGE,
    apiResponse: message,
    apiResponseType: messageType,
    allowMessageClear: allowMessageClose
  })
}

/**
 * Split detailed message
 * and
 * construct message string
 * by prefixing new line character
 * @param {array} detailedMessage
 */
export const buildDetailedMessage = detailedMessage =>
  new Promise(resolve => {
    let strDetailedMessage = ''
    try {
      detailedMessage.forEach(message => {
        strDetailedMessage += `\n - ${message}`
      })
    } catch (err) {}
    resolve(strDetailedMessage)
  })

/**
 * Clear the message shown
 */
export const clearMessage = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_MESSAGE
    })
  }
}

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
 * Handle change in login/register forms
 * @param {*} formType
 * @param {*} newState
 */
export const changeFormValue = (formType, newState) => {
  return { type: CHANGE_FORM, newState, formType: formType }
}

/**
 * Set state as ajax processing is ON/OFF
 * @param {boolean} ajaxProcessing
 */
export const setAjaxProcessing = ajaxProcessing => {
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
 * Set user data to local storage
 * @param  {...any} tokenData
 */
export const setUserData = ({ ...tokenData }) => {
  const { token, tokenExpiry, refreshToken } = tokenData

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
export const setLocalStorage = (key, value) => {
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
 * @param {boolean} checkTokenIsAlive - Check whether user's token is alive/active
 * logged in or not
 * To prevent state update, pass it as `false`
 */
export const checkAndSetLogin = async (
  dispatch,
  setAsLoggedIn = true,
  checkTokenIsAlive = false
) => {
  let isLoggedIn = false
  const userToken = getLocalStorage(USER_TOKEN)
  if (userToken !== null) {
    try {
      if (checkTokenIsAlive === true) {
        /* Check whether the token is alive */
        await isTokenAlive()
      }
      isLoggedIn = true
    } catch (err) {
      /* Refresh token */
      try {
        const response = await getFreshToken()

        if (response.data.token) {
          isLoggedIn = true
          setUserData(response.data)
        }
      } catch (err) {
        console.log(err)
      }
    }

    if (setAsLoggedIn === true) {
      dispatch(setLoggedIn(isLoggedIn))
    }
  }
  return isLoggedIn
}

/**
 * Check whether user is already logged in or not
 * @param {*} dispatch
 * @param {*} fromPublicRoute - Whether to check already logged in status or not
 * @return boolean
 */
export const checkLoggedInAndRedirect = (dispatch, fromPublicRoute = true) => {
  const loggedInStatus = checkAndSetLogin(dispatch, false, fromPublicRoute)
  let message = ''
  return loggedInStatus.then(isLoggedIn => {
    if (fromPublicRoute && isLoggedIn) {
      message = LOGGED_IN_ALREADY
    } else if (!fromPublicRoute && !isLoggedIn) {
      message = LOGGED_IN_NOT
    } else {
      return false
    }

    errorHandler(dispatch, message)
    setTimeout(() => {
      window.location.href = window.location.origin
    }, 3000)
    return true
  })
}

/**
 * Reset the form
 * @param {string} form Form Type
 */
export const resetForm = form => {
  return { type: RESET_FORM, formType: form }
}
