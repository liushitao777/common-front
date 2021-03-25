<template>
  <div class="navbar">
    <div class="imgEa fl">
      <img
        class="logo"
        src="@/assets/NavBar/logo_u57.png"
        width="85.5"
        height="40"
      >
    </div>
    <div
      v-if="type === 'sjkf'"
      class="imgEa fl"
    >
      <span class="title">{{ settings.title }}</span>
    </div>
    <div
      v-else-if="type === 'AI'"
      class="imgEa fl"
    >
      <span class="title">中电科技AI平台</span>
    </div>
    <div
      v-if="type === 'sjkf'"
      class="buttonEa fl"
    >
      <!--      <router-link to="/indexPage" type="primary" class="linkItem" data-beforeContent="首页">首页</router-link>-->
      <!--      <router-link to="/dataResource" type="primary" class="linkItem" data-beforeContent="数据资源目录" active-class="activeClass">数据资源目录</router-link>-->
      <!--      <router-link to="/analysis" type="primary" class="linkItem" data-beforeContent="统计分析" active-class="activeClass">统计分析</router-link>-->
      <!--      <router-link to="/test" type="primary" class="linkItem">测试</router-link>-->
    </div>
    <div
      v-else-if="type === 'AI'"
      :span="8"
      class="buttonEa fl"
    >
      <router-link
        to="/index"
        type="primary"
        class="linkItem"
      >首页</router-link>
      <router-link
        to="/dataResource"
        type="primary"
        class="linkItem"
      >模型训练</router-link>
      <router-link
        to="/analysis"
        type="primary"
        class="linkItem"
      >Demo</router-link>
      <router-link
        to="/test"
        type="primary"
        class="linkItem"
      >场景训练</router-link>
    </div>
    <div
      v-if="token"
      class="right-menu fr"
    >
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="hover"
      >
        <div class="avatar-wrapper">
          <img
            src="../../assets/login/user.png"
            class="user-avatar"
          >
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/userCenter/index">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-link
            :underline="false"
            @click="logoutHandleClick"
          >
            <el-dropdown-item>退出登陆</el-dropdown-item>
          </el-link>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import comLogin from "../../views/login/index"
import settings from "../../settings"

export default {
  components: {
    comLogin
  },
  data() {
    return {
    	type: 'sjkf',
      isLogin: true,
      gridData: [],
      settings
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'token'
    ])
  },
  mounted() {
  },
  methods: {
    logoutHandleClick() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push({
          path: "/login"
        })
      })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  /*background: -webkit-linear-gradient(right, rgb(4, 48, 89), rgb(8, 108, 150), rgb(4, 48, 89));*/
  background-color: #37405E;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  .logo{
    width: 100px;
  }
  .loginEa{
    line-height: 50px;
    .el-link:not(:last-child):before {
      content: "";
      position: absolute;
      top: 10px;
      bottom: 10px;
      right: 0;
      width: 1px;
      background-image: linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.6), rgba(255,255,255,0.2));
    }
  }
  .imgEa{
    margin: 3.5px 20px;
  }
  .title{
    color: white;
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
    font-size: 22px;
    font-weight: bold;
    line-height: 43px;
  }
  .linkItem{
    color: white;
    margin-left: 40px;
  }
  .linkItem:hover{
    color: rgb(51,223,251)!important;
  }
  .activeClass{
    position: relative;
    color: rgb(51,223,251);
    font-weight: bold;
    z-index: 999;
  }
  .activeClass:before{
    content: attr(data-beforeContent);
    text-align: center;
    position: absolute;
    top: -18px;
    bottom: -18px;
    left: -20px;
    right: -20px;
    border-bottom: 2px solid rgba(54,230,255, 1);
    background-image: linear-gradient(rgba(0,59,103,1), rgba(15,109,147,1));
    z-index: 1;
  }
  .buttonEa{
    font-size: 16px;
    color: white;
    line-height: 50px;
    margin-left: 20px;
    a:hover{
      color: #409EFF;
    }
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 35px;
          height: 35px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
