import Vue from 'vue'
import Router from 'vue-router'
import Main from './modules/main'
import homeApi from '../api/homeApi'
import config from '../config/config'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import NProgress from "nprogress";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: config.url === '/ses-platform'?'/indexPage':'/largeScreen',
    children: Main
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  linkActiveClass: "activeClass",
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
const router = createRouter()

async function getRouterList(){ //获取菜单
  let routeList;
  await homeApi.loadUserMenus({
    includeButtons : true
  }).then(data => {
    let res=data.data.data.back;
    routeList = res;
  }).catch(e => {
      console.log({message: e.message ? e.message : e, center: true})
  })
  return routeList
}
async function getButtonList(id){ //获取按钮权限
  homeApi.getButtonByMenusUrl({id}).then(data => {
    // this.menuList = this.menuList1
    window.localStorage.setItem('btnList', JSON.stringify(data.data.data))
    if(!(data.data.data)){
      window.localStorage.setItem('btnList', JSON.stringify([]))
    }
  }).catch(e => {
      this.$message.error({message: e.message ? e.message : e, center: true})
  })
}
getRouterList().then(routeList=>{
  router.beforeEach((to, from, next)=>{
    if(!routeList){
       window.location.reload()
    }
    routeList.map(item=>{
      if(item.children){
        item.children.map(cItem=>{
          if(cItem.url==to.path){
            if(to.query.id){
              getButtonList(to.query.id)
              next()
            }else{
              getButtonList(cItem.id)
              next({path:to.path,query:{id:cItem.id}})
            }
          }
        })
      }else if(item.url==to.path){
        if(to.query.id){
          getButtonList(to.query.id)
          next()
        }else{
          getButtonList(item.id)
          next({path:to.path,query:{id:item.id}})
        }
      }else{
        // next()
        NProgress.done()
      }
    })
  })
});

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router