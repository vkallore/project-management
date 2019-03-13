import { API_ERROR_404, API_COMMON_ERROR } from 'constants/AppMessage'
import {
  SHOW_MESSAGE,
  CSS_CLASS_DANGER,
  CLEAR_MESSAGE
} from 'constants/AppConstants'

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
    } else {
      /* Handle any other error */
      message = error.message || API_COMMON_ERROR
    }
  } catch (err) {
    message = 'Error occurred!'
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

export const clearMessage = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_MESSAGE
    })
  }
}
