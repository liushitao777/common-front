import { getToken, setToken, removeToken } from '@/utils/auth'
import homeApi from "../../api/homeApi";

const state = {
  menuList: ""
}

const mutations = {
  SET_MENU_LIST: (state, menuList) => {
    state.menuList = menuList
  }
}

const actions = {
  setMenuList({commit}, data) {
    return new Promise((resolve, reject) => {
      homeApi.loadUserMenus({includeButtons : true}).then(data => {
        commit("SET_MENU_LIST", data.data.data)
        resolve(data.data.data)
      }).catch(e => {
        reject(e)
      })
    })
  },
  cleanMenuList({commit}) {
    return new Promise((resolve, reject) => {
      commit("SET_MENU_LIST", "")
      resolve("")
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
