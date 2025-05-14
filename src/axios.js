import axios from "axios"
import { ElNotification } from 'element-plus'
import { getToken } from '~/composables/auth'


const service = axios.create({
    // baseURL:"http://ceshi13.dishait.cn" //域名or根目录or相同的那部分
    //vite配置了server，用/api代替域名
    baseURL: "/api"
})

// 添加 请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    // 往header头自动添加token
    // const cookie = useCookies()
    // const token = cookie.get("admin-token")
    const token = getToken()
    if(token){
        config.headers["token"] = token
    }


    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加 响应拦截器
service.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data.data;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么

    ElNotification({
        message: error.response.data.msg || "请求失败",
        type: 'error',
        duration: 3000
    })

    return Promise.reject(error);
});

export default service