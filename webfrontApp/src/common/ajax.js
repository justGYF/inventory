import axios from 'axios'
import store from '@/store'

// create返回一个axios实例
const Service = axios.create({
    baseURL: process.env.MOCK_URL,
    timeout: 180000
})

// 预留取消请求的变量   Source.cancel() --- 关闭请求
const CancelToken = axios.CancelToken
const source = CancelToken.source()



// 在请求之前拦截
// Service.interceptors.request.use(config => {
//     config.cancelToken = store.state.cancel.source.token
//     return config
// }, err => {
//     return new Promise.reject(err)
// })



// 封装请求方法 -- 参数 --- 请求方法，路径，数据，配置
const request = (method, url, data, config = {}) => {
    // 整合参数
    const options = Object.assign({}, config, {
        url,
        method,
        data
    })
    options.headers = options.headers || {}
    options.cancelToken = source.token

    return new Promise((resolve, reject) => {
        Service.request(options)
            .then(res => {
                resolve(res)
            })
            .catch(res => {
                reject(res)
            })
    })
}


export const ajax = {
    get: (url, config) => (
        request('get', url, null, config)
    ),
    post: (url, data, config = {}) => {
        if (!config.headers) {
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }
        return request('post', url, data, config)
    }
}