import baseRequest from "@/axios/baseRequest"
import config from "../config/config";

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
