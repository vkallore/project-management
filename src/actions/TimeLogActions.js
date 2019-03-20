import { saveTimeLog, getTimeLog, timeLogDelete } from 'services/timeLog'

import {
  errorHandler,
  clearMessage,
  dispatchMessage,
  resetForm,
  setAjaxProcessing,
  checkLoggedInAndRedirect
} from 'actions'

import { toISOString } from 'helpers'

import { CSS_CLASS_SUCCESS } from 'constants/AppConstants'
import {
  TIME_LOG_ADD_SUCCESS,
  TIME_LOG_DELETE_SUCCESS
} from 'constants/AppMessage'
import { FORM_TIME_LOG } from 'constants/AppForms'

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
    try {
      dispatch(setAjaxProcessing(true))

      const isoStartDateTime = toISOString({
        date: startDate,
        time: startTime
      })
      let newFormData = {
        category,
        startTime: isoStartDateTime,
        durationInMin: duration,
        taskName
      }

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

export const timeLogs = ({ offset, perPage }) => {
  return async dispatch => {
    try {
      dispatch(setAjaxProcessing(true))

      /**
       * Check whether user is already logged in or not
       */
      const isRedirecting = checkLoggedInAndRedirect(dispatch, false)
      if (isRedirecting) {
        return []
      }

      const params = { offset, limit: perPage }
      const response = await getTimeLog(params)

      dispatch(setAjaxProcessing(false))

      return response.data
    } catch (error) {
      errorHandler(dispatch, error, true)
      dispatch(setAjaxProcessing(false))
      return []
    }
  }
}

export const deleteTimeLog = timeLogId => {
  return async dispatch => {
    try {
      dispatch(setAjaxProcessing(true))

      dispatch(clearMessage())

      /**
       * Check whether user is already logged in or not
       */
      const isRedirecting = checkLoggedInAndRedirect(dispatch, false)
      if (isRedirecting) {
        return []
      }

      const response = await timeLogDelete(timeLogId)

      dispatch(setAjaxProcessing(false))
      dispatchMessage(
        dispatch,
        TIME_LOG_DELETE_SUCCESS,
        null,
        CSS_CLASS_SUCCESS,
        true
      )

      return response.data
    } catch (error) {
      errorHandler(dispatch, error, true)
      dispatch(setAjaxProcessing(false))
      return []
    }
  }
}
