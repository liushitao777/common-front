import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const userInfo = 'userInfo'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // service.defaults.withCredentials = true
  // service.headers.token = token
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserInfo() {
  return Cookies.get(userInfo)
}

export function setUserInfo(userInfoParams) {
  // service.defaults.withCredentials = true
  // service.headers.token = token
  return Cookies.set(userInfo, userInfoParams)
}
