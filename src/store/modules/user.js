import loginApi from "../../api/loginApi"
import { getToken, setToken, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'
import { resetRouter } from '@/router'
import {getUserInfo, setUserInfo} from "../../utils/auth";

const state = {
  token: getToken(),
  name: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // user login
  dologin({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      loginApi.dologin({ username: userInfo.username, password: userInfo.password}).then(data => {
        if (data.data.success) {
          window.localStorage.setItem('userInfo', JSON.stringify(data.data.data))
          commit('SET_TOKEN', data.data.data.userCode)
          setToken(data.data.data.userCode)
          commit('SET_NAME', data.data.data.userCode)
          commit('SET_AVATAR', "assets/login/user.png")
          console.log("data.data.data", data.data.data)
          commit("SET_USERINFO", data.data.data)
          setUserInfo({
            userCode: data.data.data.userCode,
            avatar: "assets/login/user.png"
          })
          resolve(data)
        } else {
          Message({
            message: data.data.message,
            type: 'error',
            duration: 5 * 1000
          })
          reject(data)
        }
      }).catch(error => {
        // console.log("error", error)
        // commit('SET_TOKEN', "asdfdaf")
        // setToken("asdfdaf")
        // commit('SET_NAME', "测试")
        // Message({
        //   message: "登录成功！",
        //   type: 'success',
        //   duration: 5 * 1000
        // })
        // resolve("成功")
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const userInfo = JSON.parse(getUserInfo())
      commit('SET_NAME', userInfo.userCode)
      commit('SET_AVATAR', "assets/login/user.png")
      resolve()
      // loginApi.getInfo(state.token).then(data => {
      //   if (!data) {
      //     reject('Verification failed, please Login again.')
      //   }
      //   // commit('SET_TOKEN', data.data.data.token)
      //   // commit('SET_NAME', data.data.data.username)
      //   // commit("SET_USERINFO", data.data.data)
      //   commit('SET_AVATAR', "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif")
      //   console.log("12222")
      //   resolve(data)
      // }).catch(error => {
      //   console.log("333")
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // loginApi.logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      commit('SET_NAME', "")
      removeToken()
      resetRouter()
      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
