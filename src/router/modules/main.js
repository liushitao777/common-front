export default [
  {
    path: '/index',
    name: "首页",
    redirect: "/indexPage",
    component: () => import('@/views/index'),
    hidden: true,
    children: [
      // 首页
      {
        path: '/indexPage',
        name: "首页",
        component: () => import('@/views/indexPage/index')
      },

      // 系统管理
      {
        path: '/userAuth/user',
        name: "用户管理",
        component: () => import('@/views/userAuth/user')
      },
      {
        path: '/userAuth/auth/index',
        name: "权限管理",
        component: () => import('@/views/userAuth/auth/index')
      },
      {
        path: '/userAuth/logs',
        name: "日志中心",
        component: () => import('@/views/userAuth/logs')
      },
      {
        path: '/userAuth/updatePwd',
        name: "密码修改",
        component: () => import('@/views/userAuth/updatePwd')
      },
      {
        path: '/userAuth/organization',
        name: "组织机构",
        component: () => import('@/views/userAuth/organization')
      },
      // 个人中心
      {
        path: '/userCenter/index',
        name: "个人中心",
        component: () => import('@/views/userCenter/index')
      },
    ]
  }
]
