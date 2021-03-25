import baseRequest from "@/axios/baseRequest"
import config from "@/config/config"
import utils from "@/utils/index"
export default {
  // login(params) {
  //   console.log("aaaaaaaaa1")
  //   return new Promise((resolve, reject) => {
  //     baseRequest.post(config.url + "/user1/login", params).then(data => {
  //       console.log("aaaaaaaaa3")
  //       resolve(data)
  //     }).catch(e => {
  //       console.log("aaaaaaaaa4")
  //       reject(e)
  //     })
  //   })
  // },
  logOut() {

  },
  dologin(params) {
    const tempParams = utils.jsonToQuery(params)
    return new Promise((resolve, reject) => {
        baseRequest.post(config.url+"/login", tempParams, {headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          }}).then(data => {
          resolve(data)
        }).catch(e => {
          reject(e)
        })
    })
  },
  getInfo() {
    return new Promise((resolve, reject) => {
      baseRequest.get(config.url + "/user1/getUserInfo").then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  modifyUserInfo(params) {
    return new Promise((resolve, reject) => {
      console.log("loginApi1")
      baseRequest.post(config.url + "/user1/updateUserInfo", params).then(data => {
        console.log("loginApi2")
        resolve(data)
      }).catch(e => {
        console.log("loginApi3")
        reject(e)
      })
    })
  },
  getCaptcha() {
    return new Promise((resolve, reject) => {
      baseRequest.get(config.url + "/user1/captcha").then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  modifyUserPassword(params) {
    return new Promise((resolve, reject) => {
      baseRequest.post(config.url + "/user1/updateUserPassword", params).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  getSubscribeList() {
    return new Promise((resolve, reject) => {
      baseRequest.post(config.url + "/subscribe/list").then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  getRegionByCode(code) {
    return new Promise((resolve, reject) => {
      baseRequest.get(config.url + "/user1/getRegionByCode/" + code).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  register(params) {
    return new Promise((resolve, reject) => {
      baseRequest.post(config.url + "/user1/register", params).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  refreshSecretKey() {
    return new Promise((resolve, reject) => {
      baseRequest.get(config.url + "/user1/refreshSecretKey").then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  }
}
