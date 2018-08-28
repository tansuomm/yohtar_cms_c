import axios from 'axios'
import qs from 'qs'
// 创建axios实例
const service = axios.create({
  baseURL: '/cms/', // api的base_url
  timeout: 30000 // 请求超时时间
})
// request拦截器
service.interceptors.request.use(config => {
  // Do something before request is sent
  config.transformRequest = [function (data) {
    //数据序列化
    return qs.stringify(data);
  }]
  if (sessionStorage.getItem('token')) {
    config.headers['Authorization'] = JSON.parse(sessionStorage.getItem('token'))
  }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => response.data,
  error => {
    console.log(error)
    // Message({
    //   message: error.msg,
    //   type: 'error',
    //   duration: 2 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
