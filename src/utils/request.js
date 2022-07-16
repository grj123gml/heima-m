// 引入axios
import axios from 'axios'
import store from '@/store'
// 配置默认配置
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})

// 添加请求拦截器
request.interceptors.request.use(
  (config) => {
  // 在发送请求之前做些什么
    const token = store.state.user.token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
  // 对请求错误做些什么
    return Promise.reject(error)
  })
export default request
