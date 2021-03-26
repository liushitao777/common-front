import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import utils from "@/utils/index"

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000, // request timeout
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "token": ""
  }
})
// request interceptor
service.interceptors.request.use(
  config => {
    utils.toggleLoading(1)
    // do something before request is sent
    //		config.headers['X-Token'] = getToken()
    config.headers['X-Requested-With'] = 'XMLHttpRequest'
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    utils.toggleLoading(-1)
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    utils.toggleLoading(-1)
    const res = response
    return res
  },
  error => {
    if (error && error.response && error.response.status === 401) {
      error.message = error.response.data.message
      error.code = 401
      store.dispatch("user/logout").then(data => {
        window.location.href = "./#/login"
      }).catch(e => {
          this.$message.error({message: e.message ? e.message : e, center: true})
      })
      // Vue.$refs.commonLogin.show(true)
    }
    utils.toggleLoading(-1)
    return Promise.reject(error)
  }
)

export default service

let duration = () => {

}
