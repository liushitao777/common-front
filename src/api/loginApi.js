import baseRequest from "@/axios/baseRequest"
import config from "@/config/config"
import utils from "@/utils/index"
export default {
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
  register(params) {
    return new Promise((resolve, reject) => {
      baseRequest.post(config.url + "/user1/register", params).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  }
}
