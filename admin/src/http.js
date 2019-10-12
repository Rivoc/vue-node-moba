import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})
//响应拦截器
http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message.error(err.response.data.message)
  }
  //约定返回401就跳回登录页
  if (err.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(err)


})



//请求拦截，设置token
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  //有token就在请求头里带上token
  if (localStorage.token) {
    //行业规范，加上Bearer,可能没有token，不能把undefined传上去，用||判断一下
    config.headers.Authorization = localStorage.token
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
export default http