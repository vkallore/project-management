import request from 'services'

import { getLocalStorage } from 'actions'

import { USER_TOKEN } from 'constants/AppConstants'

export const saveTimeLog = ({ ...formData }) => {
  return request.post('/task/time-log/', formData, {
    headers: {
      Authorization: getLocalStorage(USER_TOKEN)
    }
  })
}