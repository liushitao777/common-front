import baseRequest from "@/axios/baseRequest"
import config from "../config/config";

// export function login(data) {
//   return baseRequest({
//     url: '/user/login',
//     method: 'post',
//     data
//   })
// }

export function getInfo(token) {
  return baseRequest({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return baseRequest({
    url: '/user/logout',
    method: 'post'
  })
}
export default{
  updatePwd(params) {
    return new Promise((resolve, reject) => {
      baseRequest.post(config.url + "/user/modPwd", params).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  }
}
