import axios from 'axios'

axios.defaults.baseURL = '/eleme'
axios.defaults.withCredentials = true
axios.defaults.timeout = 30000

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data.result) {
    return {
      result: true,
      data: response.data.data,
      message: '操作成功'
    }
  } else {
    return {
      result: true,
      data: null,
      message: '请求错误'
    }
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default axios
