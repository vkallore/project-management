import request from 'services'

export const doLogin = ({ ...formData }) => {
  return request.post('auth/user/login', formData)
}

export const doRegister = ({ ...formData }) => {
  return request.post('auth/user/', formData)
}
