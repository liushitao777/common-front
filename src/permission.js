import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import homeApi from "./api/homeApi";
import routerConfig from "./router/modules/main"
import Layout from '@/layout'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/dataResource', '/dataResourceDetail', '/analysis'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) { // 是否登录
    if (to.path == '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else if (to.path == '/404') {
      next()
    } else {
      // 获取用户信息
      const hasGetUserInfo = store.getters.name
      if (!hasGetUserInfo) { // 是否有用户信息
        try {
          // get user info
          await store.dispatch('user/getInfo')
          console.log("noUserInfo")
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }

      if (!store.state.menu || !store.state.menu.menuList) { // 获取权限菜单
        // await store.dispatch('user/getInfo')
        let routeList = await store.dispatch("menu/setMenuList")
        console.log("vuex-Store", store.state)
        console.log("权限菜单routeList", routeList)
        console.log("路由配置routerConfig", routerConfig)
        // routerConfig[0].children = getRouteMap(routerConfig[0].children, store.state.menu.menuList.back)
        // console.log("动态添加路由", router)
        // router.addRoutes([{
        //   path: '/',
        //   component: Layout,
        //   redirect: routerConfig[0].children[0].path,
        //   children: routerConfig
        // }])
      }

      // 判断页面权限
      if (!pageAuth(to, from, next)) {
        const firstPage = getRouteMap(routerConfig[0].children, store.state.menu.menuList.back)[0].path
        next(firstPage)
        NProgress.done()
      } else {
        //按钮权限
        buttonAuth(to, from, next)
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
      NProgress.done()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
      // next()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})


async function getButtonList(id, next){ //获取按钮权限
  homeApi.getButtonByMenusUrl({id}).then(data => {
    // this.menuList = this.menuList1
    window.localStorage.setItem('btnList', JSON.stringify(data.data.data))
    if(!(data.data.data)){
      window.localStorage.setItem('btnList', JSON.stringify([]))
    }
    next()
  }).catch(e => {
    this.$message.error({message: e.message ? e.message : e, center: true})
  })
}

function getRouteMap(sourceList, targList) {
  const resultList = []
  sourceList.map(source => {
    targList.map(targ => {
      if (targ.children) {
        if (targ.children.findIndex(subTarg => subTarg.url === source.path) !== -1) {
          resultList.push(source)
        }
      } else {
        if (source.path === targ.url) {
          resultList.push(source)
        }
      }
    })
  })
  console.log("result", resultList)
  return resultList
}
function buttonAuth(to, from, next) {
  console.log("按钮权限")
  // 根据页面id获取按钮权限
  store.state.menu.menuList.back.map(item=>{
    if(item.children){
      item.children.map(cItem=>{
        if(cItem.url==to.path){
          // if(to.query.id){
          //   getButtonList(to.query.id)
          //   console.log("按钮权限1")
          //   next()
          // }else{
          //   getButtonList(cItem.id)
          //   console.log("按钮权限2")
          //   next({path:to.path,query:{id:cItem.id}})
          // }
          getButtonList(cItem.id, next)
        }
      })
    }else if(item.url==to.path){
      // if(to.query.id){
      //   getButtonList(to.query.id)
      //   console.log("按钮权限3")
      //   next()
      // }else{
      //   getButtonList(item.id)
      //   console.log("按钮权限4")
      //   next({path:to.path,query:{id:item.id}})
      // }
      getButtonList(item.url, next)
    }else{
      // console.log("按钮权限5")
      next()
      NProgress.done()
    }
  })
  // 根据页面id获取按钮权限END
}
function pageAuth(to, from, next) {
  // 根据页面id获取按钮权限
  let result = false
  store.state.menu.menuList.back.map(item=>{
    if(item.children){
      if (item.children.findIndex(v => v.url === to.path) !== -1) {
        result = true
      }
    }else if(item.url===to.path){
      result = true
    }
  })
  console.log("页面权限", result)
  return result
  // 根据页面id获取按钮权限END
}
