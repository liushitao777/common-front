import baseRequest from "@/axios/baseRequest"
import utils from "../utils/index"
import config from "../config/config";
export default {
  // 获取所有菜单
  loadAllUserMenus(params) {
    let paramStr = "";
    for (const key in params) {
      // if (params[key]) {
        paramStr += [key] + "=" + params[key] + "&";
      // }
    }
    const url = paramStr
      ? config.url + "/loadUserMenus?" + paramStr
      : config.url + "/loadUserMenus";
    return new Promise((resolve, reject) => {
      baseRequest.get(url).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  // 获取角色列表
  roleList(params) {
    let paramStr = "";
    for (const key in params) {
      if (params[key]) {
        paramStr += [key] + "=" + params[key] + "&";
      }
    }
    const url = paramStr
      ? config.url + "/role/pageRole?" + paramStr
      : config.url + "/role/pageRole";
    return new Promise((resolve, reject) => {
      baseRequest.get(url).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  // 获取用户列表
  userList(params) {
    let paramStr = ''
    for (const key in params) {
      if (params[key]) {
        paramStr += [key] + '=' + params[key] + '&'
      }
    }
    const url = config.url + "/user/pageUserList?" + paramStr
    return new Promise((resolve, reject) => {
      baseRequest.get(url).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  // 新增角色
  addNewRole(params) {
    return new Promise((resolve, reject) => {
      baseRequest.post(config.url + `/role/addOrUpdateRole`, params).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  updateRole(params) {
    return new Promise((resolve, reject) => {
      baseRequest.post(config.url + `/user/updateUser`, params).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  deleteRole(params) {
    return new Promise((resolve, reject) => {
      baseRequest.delete(config.url + "/role/delRoleById?id=" + params.ids.join(',')).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  getRoleList() {
    return new Promise((resolve, reject) => {
      baseRequest.get(config.url + '/role/list').then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  addNewUser(params) {
    return new Promise((resolve, reject) => {
      baseRequest.post(config.url + `/user/addUser`, params).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  addMakerUser(params) {
    const temParams = utils.jsonToQuery(params);
    return new Promise((resolve, reject) => {
      baseRequest.post(config.url + `/sysUser/addMakerUser?`+ temParams).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  deleteUser(params) {
    return new Promise((resolve, reject) => {
      baseRequest.delete(config.url + "/user/delUserById", {params}).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  changePwd(params) {
    return new Promise((resolve, reject) => {
      baseRequest.post(config.url + `/user/modPwd`, params).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  //日志中心

  // 获取日志列表
  getJournalList(params) {
    let paramStr = ''
    for (const key in params) {
      if (params[key]) {
        paramStr += [key] + '=' + params[key] + '&'
      }
    }
    const url = config.url + "/sysLog/list?" + paramStr
    return new Promise((resolve, reject) => {
      baseRequest.get(url).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
}
