import baseRequest from "@/axios/baseRequest"
import utils from "../utils/index"
import config from "../config/config"
export default {
  getOrgTree(params) {
    return new Promise((resolve, reject) => {
      baseRequest.get(config.url + "/org/getOrgTree", params).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  queryOrgById(params) {
    let paramStr = ''
    for (const key in params) {
      if (params[key]) {
        paramStr += [key] + '=' + params[key] + '&'
      }
    }
    return new Promise((resolve, reject) => {
      baseRequest.get(config.url + "/org/queryOrgById?" + paramStr).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },

  getDepartTreeByOrgCode(params) {
    let paramStr = ''
    for (const key in params) {
      if (params[key]) {
        paramStr += [key] + '=' + params[key] + '&'
      }
    }
    return new Promise((resolve, reject) => {
      baseRequest.get(config.url + "/depart/getDepartTreeByOrgCode?" + paramStr).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },

  queryDepartById(params) {
    let paramStr = ''
    for (const key in params) {
      if (params[key]) {
        paramStr += [key] + '=' + params[key] + '&'
      }
    }
    return new Promise((resolve, reject) => {
      baseRequest.get(config.url + "/depart/queryDepartById?" + paramStr).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },

  insertOrg(params) {
    return new Promise((resolve, reject) => {
      baseRequest.post(config.url + "/org/insertOrg", params).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },

  updateOrg(params) {
    return new Promise((resolve, reject) => {
      baseRequest.put(config.url + "/org/updateOrg", params).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },

  addDepart(params) {
    return new Promise((resolve, reject) => {
      baseRequest.post(config.url + "/depart/addDepart", params).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },

  updDepartById(params) {
    return new Promise((resolve, reject) => {
      baseRequest.put(config.url + "/depart/updDepartById", params).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },

  deleteOrg(params) {
    return new Promise((resolve, reject) => {
      baseRequest.delete(config.url + "/org/deleteById", {params}).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  deleteDepartById(params) {
    return new Promise((resolve, reject) => {
      baseRequest.delete(config.url + "/depart/deleteDepartById", {params}).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  uploadFile(params) {
    return new Promise((resolve, reject) => {
      baseRequest
        .post(config.url + "/org/bulkImportOrganization", params)
        .then(data => {
          resolve(data);
        })
        .catch(e => {
          reject(e);
        });
    });
  },

}
