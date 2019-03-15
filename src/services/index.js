import axios from 'axios'

const baseURL = `${process.env.REACT_APP_API_URL}/api/auth/`

const requestHeader = {
  // 'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
}

export default axios.create({
  baseURL,
  headers: requestHeader
})
