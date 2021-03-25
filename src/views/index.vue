<template>
  <el-row class="userCenter">
    <el-col :span="4" style="background-color: white;">
      <el-col style="box-shadow:0px 0px 10px 0px rgba(55,64,94,0.3);" class="z_cd">
        <el-menu style="height: calc(100vh - 50px); overflow: auto; padding: 10px;" :default-active="$route.path"
          :router="true" class="menuEa" unique-opened @open="open" @select="select" ref="elMenu">
          <div v-for="v in menuList" class="menu">
            <el-menu-item v-if="!v.children" :index="v.url">
              <template slot="title">
                <img v-if="$route.path.indexOf(v.url) !== -1 && $route.path !== v.url" class="selfImage" :src="require('../' + v.icon + 'Blue.png')">
                <img v-if="$route.path.indexOf(v.url) === -1" class="selfImage" :src="require('../' + v.icon + 'Gray.png')">
                <img v-if="$route.path === v.url" class="selfImage" :src="require('../' + v.icon + 'White.png')">
                <span slot="title" class="firstLevel">{{ v.name }}</span>
              </template>
            </el-menu-item>
          </div>
          <div v-for="v in menuList">
            <el-submenu v-if="v.children" :index="v.url">
              <template slot="title">
                <img v-if="$route.path.indexOf(v.url) !== -1 && $route.path !== v.url" class="selfImage" :src="require('../' + v.icon + 'Blue.png')">
                <img v-if="$route.path.indexOf(v.url) === -1" class="selfImage" :src="require('../' + v.icon + 'Gray.png')">
                <span slot="title" class="firstLevel">{{ v.name }}</span>
              </template>
              <el-menu-item-group v-for="w in v.children" class="menu">
                <el-submenu v-if="w.children" :index="w.url">
                  <template slot="title">
                    <i class="el-icon-space" />
                    <span>{{ w.name }}</span>
                  </template>
                  <el-menu-item v-for="x in w.children" :index="x.url">
                    <i class="el-icon-space" />
                    <span>{{ x.name }}</span>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item v-if="!w.children" :index="w.url">
                  <span>&emsp;{{ w.name }}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </div>
        </el-menu>
      </el-col>
    </el-col>
    <el-col :span="20" style="height: calc(100vh - 50px);overflow: auto">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="$route.fullPath" />
      </transition>
    </el-col>
  </el-row>
</template>

<script>
  import router from "../router"
  import homeApi from "../api/homeApi"
  export default {
    name: "Index",
    data() {
      return {
        menuList: [],
        editableTabsValue: "",
        editableTabs: [], // 结构：{name: this.$router.name, path: this.$router.path}
        activePath: ''
      }
    },
    mounted() {
      console.log('菜单页面')
      this.getMenuList()
      this.editableTabs.push({
        name: this.$route.name,
        path: this.$route.path
      })
      this.editableTabsValue = this.$route.name
      router.afterEach((to, form) => {
        if (!this.editableTabs.find(item => item.path === to.path)) {
          this.editableTabs.push({
            name: to.name,
            path: to.path
          })
        }
        this.editableTabsValue = to.name
      })
    },
    methods: {
      getMenuList() {
        homeApi.loadUserMenus({
          includeButtons: true
        }).then(data => {
          // this.menuList = this.menuList1
          this.menuList = data.data.data.back;
          if (this.$route.path == '/indexPage') {
            this.activePath = '/indexPage'
          } else {
            this.activePath = this.$route.fullPath
          }
        }).catch(e => {
          this.$message.error({
            message: e.message ? e.message : e,
            center: true
          })
        })
      },
      select(index, indexPath) {
      },
      open(index) {
        index = index.split('?')[0]
        const temList = this.menuList.filter(item => item.url === index)
        console.log('跳转', temList)
        if (temList[0] && temList[0].children) {
          this.activePath = temList[0].children[0].url
          this.$router.push({
            path: temList[0].children[0].url
          })
          // this.$router.push(temList[0].children[0].url)
        } else {
          // this.$router.push(temList[0].url)
          this.activePath = temList[0].url
          this.$router.push({
            path: temList[0].url
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .userCenter {
    .z_cd{
      .el-submenu .el-menu-item{
        padding-left:15px !important;
      }
    }
    .menu {
      li {}
    }

    .is-active {
      li {
        margin-top: 10px;
        margin-bottom: 10px;
      }

      ul,
      div,
      li {
        background-color: #E4EFFF;
        color: #3977F3;
        font-weight: normal;
      }

      i {
        color: #3977F3;
      }

      border-radius: 4px;
      background-color: #3977F3 !important;
      color: white !important;
      font-weight: bold !important;
    }

    .el-icon-arrow-down:before {
      font-size: 17px;
    }

    .el-submenu {
      margin-top: 10px;
    }

    .is-active .el-menu-item {
      margin: 0 5px;
    }

    .el-submenu .el-menu-item,
    .el-menu-item,
    .el-submenu__title {
      height: 40px;
      line-height: 40px;
    }

    .el-submenu .el-menu-item {
      padding: 0;
      // padding-left: 15px !important;
    }

    .firstLevel {
      font-size: 17px;
    }

    .el-menu-item {
      font-size: 15px;
    }

    #app .hideSidebar .el-submenu>.el-submenu__title .el-submenu__icon-arrow {
      display: block !important;
    }

    .selfImage {
      width: 20px;
      margin-right: 10px;
    }
  }
</style>
