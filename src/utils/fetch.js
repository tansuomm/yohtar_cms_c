import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui';
// import miniToastr from 'mini-toastr'
// miniToastr.init();
// 创建axios实例
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/cms/': '/', // api的base_url
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
  response => {
    if(response.data.code !== 1){
      // miniToastr.info(response.data.msg, 'Oh,Sweet Heart',2000);
      Message({
        message: response.data.msg,
        type: 'info',
        duration:2000,
      })
    }
    return response.data;
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break;
        case 401:
          err.message = '登录过期，请重新登录'
          break;
        case 403:
          err.message = '拒绝访问'
          break;
        case 404:
          err.message = '请求错误,未找到该资源'
          break;
        case 405:
          err.message = '请求方法未允许'
          break;
        case 408:
          err.message = '请求超时'
          break;
        case 500:
          err.message = '服务器端出错'
          break;
        case 501:
          err.message = '网络未实现'
          break;
        case 502:
          err.message = '网络错误'
          break;
        case 503:
          err.message = '服务不可用'
          break;
        case 504:
          err.message = '网络超时'
          break;
        case 505:
          err.message = 'http版本不支持该请求'
          break;
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = "连接到服务器失败"
    }

    // miniToastr.info(err.message, 'Oh,Sweet Heart',2000)
    Message.closeAll();
    Message({
      message: err.message,
      type: 'info',
      duration:2000,
    })
    return Promise.reject(err)
  }
)

export default service
