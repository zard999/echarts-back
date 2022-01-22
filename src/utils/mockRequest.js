import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: '/mock', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  return config
})

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code !== 2100) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
