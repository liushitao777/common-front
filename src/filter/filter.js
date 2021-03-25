import filterMap from './filterMap'
import utils from "../utils/index"
let timeFlt = value => {
    if (!value) return ""
    return utils.parseTime(value, "{y}-{m}-{d} {h}:{i}:{s}")
  }
  // 数字千分号
  let numFormat=value=>{
    return (value + "").replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
  }

  export default {
    timeFlt,
    numFormat,
  }
