/**
 * Created by PanJiaChen on 16/11/18.
 */
// import { Loading } from "element-ui"

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export default {
  load: { amount: 0, dialog: null },
  toggleLoading(calculate) {
    this.load.amount += calculate
    setTimeout(() => {
      if (this.load.amount <= 0 && this.load.dialog) {
        this.load.dialog.close()
      } else {
        // this.load.dialog = require("element-ui").Loading.service()
      }
    })
  },
  // 年月日格式,第一个参数，new Date()
  getTime(date,fmt="yyyy-MM-dd hh:mm:ss") {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  /**
   * @param {number} time
   * @param {string} option
   * @returns {string}
   */
  formatTime(time, option) {
    if (('' + time).length === 10) {
      time = parseInt(time) * 1000
    } else {
      time = +time
    }
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
      return '刚刚'
    } else if (diff < 3600) {
      // less 1 hour
      return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
      return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
      return '1天前'
    }
    if (option) {
      return this.parseTime(time, option)
    } else {
      return (
        d.getMonth() +
        1 +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分'
      )
    }
  },

  parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      }
      if ((typeof time === 'number') && (time.toString().length === 10)) {
        time = time * 1000
      }
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  },
  formData(list) {
    let newArr = [...new Set(list)]
    newArr = newArr.sort()
    return newArr
  },
  cleanArray(actual) {
    const newArray = []
    for (let i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i])
      }
    }
    return newArray
  },
  jsonToQuery(json) {
    for(let key in json){
      if(json[key]==null||json[key]==undefined){
        delete json[key]
      }
    }
    if (!json) return ""
    return this.cleanArray(Object.keys(json).map(key => {
      if (json[key] === undefined) return ""
      return encodeURIComponent(key) + "=" +
        encodeURIComponent(json[key])
    })).join("&")
  },
  // 正则表达式
  regex: {
    phone: /^1[3456789]\d{9}$/,
    email: /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/,
    realname: /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]/im
  },
  isToday(time) {
    if (time) {
      return new Date(time).getDate() === new Date().getDate()
    }
  },
  isInArray(list, str) {
    return list.findIndex(item => item === str) === -1
  }
}

//
// /**
//  * @param {string} url
//  * @returns {Object}
//  */
// export function param2Obj(url) {
//   const search = url.split('?')[1]
//   if (!search) {
//     return {}
//   }
//   return JSON.parse(
//     '{"' +
//       decodeURIComponent(search)
//         .replace(/"/g, '\\"')
//         .replace(/&/g, '","')
//         .replace(/=/g, '":"')
//         .replace(/\+/g, ' ') +
//       '"}'
//   )
// }
// export function toggleLoading(calculate) {
//   this.load.amount += calculate;
//   setTimeout(() => {
//     if (this.load.amount <= 0 && this.load.dialog) {
//       this.load.dialog.close();
//     } else {
//       this.load.dialog = Loading.service();
//     }
//   });
// }
