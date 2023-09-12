import Vue from 'vue'
import axios from 'axios'
import store from "@/store";
// import { Message } from 'element-ui'
// import router from '@/router'

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 15000,
    headers:{
        'Content-Type':'application/json'
    }
})
// 添加请求拦截器
instance.interceptors.request.use(
    function(config) {
        // 在发送请求之前做些什么

        // const noTokenUrl = ['/v1/employee/list-page22222']

        // const token = sessionStorage.getItem('userToken')
        // if (token && !noTokenUrl.includes(config.url)) {
        //     config.headers.token = token
        // }

        config.headers['Content-Type'] = 'application/json'
        console.log("store.getters.userToken",store.getters.userToken);
        if (store.getters.userToken !== "") {
            config.headers['Authorization'] = "Bearer " + store.getters.userToken
        }
        return config
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    function(res) {
        // 不需要额外处理 返回值(例如没有res.data.status的情况) 的URL
        // const unHandleUrl = [
        //     '/v1/visit-log/download', //访客记录-导出
        // ]

        // if (unHandleUrl.includes(res.config.url)) {
        //     return res
        // }
        if (res.status === 200) {
          return res.data
        } else if ([600, 602].includes(res.status)) {
          // Message({
          //     message: res.data.message,
          //     type: 'error',
          // })
          // router.push('/login')
          // location.href = 'http://18.166.33.232'
        } else {
            // Message.error(res.data.message)
        }
    },
    function(error) {
        // 对响应错误做点什么
        return Promise.reject(error)
    }
)

Vue.prototype.$axios = axios
Vue.prototype.$instance = instance
export default instance
