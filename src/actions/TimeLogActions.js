import {
  errorHandler,
  clearMessage,
  dispatchMessage,
  resetForm,
  setAjaxProcessing,
  checkLoggedInAndRedirect
} from 'actions'

import { CSS_CLASS_SUCCESS } from 'constants/AppConstants'
import { TIME_LOG_ADD_SUCCESS } from 'constants/AppMessage'
import { FORM_TIME_LOG } from 'constants/AppForms'
import { saveTimeLog } from 'services/timeLog'

/**
 * Add Time log
 * @param {string} username
 * @param {string} password
 */
export const addTimeLog = ({
  category,
  startDate,
  startTime,
  duration,
  taskName
}) => {
  return async dispatch => {
    dispatch(setAjaxProcessing(true))

    const isoStartDateTime = new Date(`${startDate} ${startTime}`).toISOString()
    let newFormData = {
      category,
      startTime: isoStartDateTime,
      durationInMin: duration,
      taskName
    }

    try {
      dispatch(clearMessage())

      /**
       * Check whether user is already logged in or not
       */
      const isRedirecting = checkLoggedInAndRedirect(dispatch, false)
      if (isRedirecting) {
        return []
      }

      const response = await saveTimeLog(newFormData)

      dispatch(setAjaxProcessing(false))
      if (response.data.id) {
        dispatch(resetForm(FORM_TIME_LOG))
        dispatchMessage(
          dispatch,
          TIME_LOG_ADD_SUCCESS,
          null,
          CSS_CLASS_SUCCESS,
          true
        )
      }
      return []
    } catch (error) {
      errorHandler(dispatch, error, true)
      dispatch(setAjaxProcessing(false))
      return []
    }
  }
}
