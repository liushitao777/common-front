import baseRequest from "@/axios/baseRequest"
import utils from "../utils/index"
import config from '../config/config'
export default {
  // 获取菜单
  loadUserMenus(params) {
    return new Promise((resolve, reject) => {
      baseRequest.get(`${config.url}/loadUserMenus?includeButtons=false`).then(data => {
        console.log('菜单',data)
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
  selectDiagClassifiedStatistic(params) {
    return new Promise((resolve, reject) => {
      baseRequest.post(config.url + `/homePage/selectDiagClassifiedStatistic`, params).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  selectFaultTrendAnalysis(params) {
    return new Promise((resolve, reject) => {
      baseRequest.post(config.url + `/homePage/selectFaultTrendAnalysis`, params).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  selectArrayStringModuleDefect(params) {
    return new Promise((resolve, reject) => {
      baseRequest.post(config.url + `/homePage/selectArrayStringModuleDefect`, params).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  getDefectivePosition(params) {
    const temParams = utils.jsonToQuery(params)
    return new Promise((resolve, reject) => {
      baseRequest.get(config.url + `/homePage/getDefectivePosition?` + temParams).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  getDefectivePic(params) {
    const temParams = utils.jsonToQuery(params)
    return new Promise((resolve, reject) => {
      baseRequest.get(config.url + `/homePage/getDefectivePic?` + temParams).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  getDiagResultDetails(params) {
    return new Promise((resolve, reject) => {
      baseRequest.post(config.url + `/diagtask/details/getDiagResultDetails`, params).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  getStatByInspectCode(params) {
    const temParams = utils.jsonToQuery(params)
    return new Promise((resolve, reject) => {
      baseRequest.get(config.url + `/homePage/getStatByInspectCode?` + temParams).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  getTaskByInspectCode(params) {
    const temParams = utils.jsonToQuery(params)
    return new Promise((resolve, reject) => {
      baseRequest.get(config.url + `/homePage/getTaskByInspectCode?` + temParams).then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },

  lineChart() { //首页折线图统计
    return new Promise((resolve, reject) => {
      baseRequest.get(config.url + "/system/selectFaultTrendAnalysis").then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  lastTime() { //最近一次诊断信息
    return new Promise((resolve, reject) => {
      baseRequest.get(config.url + "/system/getLatestNewsInspect").then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  pieChart() { //首页饼图统计
    return new Promise((resolve, reject) => {
      baseRequest.get(config.url + "/system/selectDiagClassifiedStatistic").then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  tabelList() { //首页缺陷表格
    return new Promise((resolve, reject) => {
      baseRequest.get(config.url + "/system/selectArrayStringModuleDefect").then(data => {
        resolve(data)
      }).catch(e => {
        reject(e)
      })
    })
  },

}
