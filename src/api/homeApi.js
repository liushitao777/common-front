import baseRequest from "@/axios/baseRequest"
import utils from "../utils/index"
import config from '../config/config'
export default {
  // 获取菜单
  loadUserMenus(params) {
    return new Promise((resolve, reject) => {
      baseRequest.get(`${config.url}/loadUserMenus?${utils.jsonToQuery({includeButtons: false, judgeUser: true})}`).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  // 根据菜单id查询该页面有权限的按钮
  getButtonByMenusUrl(params) {
    return new Promise((resolve, reject) => {
      baseRequest.get(`${config.url}/getButtonByMenusUrl`,{params}).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
}
