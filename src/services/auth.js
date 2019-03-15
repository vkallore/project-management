import request from 'services'

export const doLogin = ({ username, password }) => {
  return request.post('/user/login', {
    username,
    password
  })
}
