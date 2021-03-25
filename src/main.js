import Vue from 'vue'
import App from './App'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import echarts from "echarts"
import '@/styles/index.scss' // global css
import store from './store'
import router from './router'
import filter from './filter/filter'
import comComponent from "./components/common/index"
import eventBus from "./eventBus";
// 获取生成器
import '@/icons' // icon
import '@/permission' // permission control
Object.keys(filter).forEach(key => Vue.filter(key, filter[key]))
// 自定义的公用组件

Vue.prototype.$eventBus = eventBus
Vue.prototype.$echarts = echarts
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
Vue.use(comComponent)

