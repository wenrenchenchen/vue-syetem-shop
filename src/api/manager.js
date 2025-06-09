import axios from '~/axios'
import { queryParams } from '~/composables/util'

export function login(username, password) {
    return axios.post("/admin/login", {
        username,
        password
    })
}


export function getinfo() {
    // 在请求拦截器那边已经设置header头自动添加token
    // return axios.post("/admin/getinfo" ,{
    //     token
    // })
    return axios.post("/admin/getinfo")
}
// 退出登录的接口
export function logout() {
    return axios.post("/admin/logout")
}
// 修改密码的接口
export function updatepassword(data) {
    return axios.post("/admin/updatepassword", data)
}

export function getManagerList(page, query = {}) {
    const r = queryParams(query)
    return axios.get(`/admin/manager/${page}${r}`)
}

export function updateManagerStatus(id, status) {
    return axios.post(`/admin/manager/${id}/update_status`, {
        status
    })
}

export function createManager(data){
    return axios.post("/admin/manager" ,data)
}
export function updateManager(id,data){
    return axios.post(`admin/manager/${id}`,data)
}
export function deleteManager(id){
    return axios.post(`admin/manager/${id}/delete `)
}

