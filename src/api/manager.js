import axios from '~/axios'


export function login(username,password) {
    return axios.post("/admin/login" ,{
        username,
        password
    })
}


export function getinfo(){
    // 在请求拦截器那边已经设置header头自动添加token
    // return axios.post("/admin/getinfo" ,{
    //     token
    // })
    return axios.post("/admin/getinfo")
}
// 退出登录的接口
export function logout(){
    return axios.post("/admin/logout")
}
// 修改密码的接口
export function updatepassword(data){
    return axios.post("/admin/updatepassword",data)
}

export function getManagerList(page, query = {}){
    let q = []
    for(const key in query){
        if(query[key]){
            q.push(`${key}=${encodeURIComponent(query[key])}`)
        }
    }
    let r = q.join("&")
    r = r ? ("?" + r) :""
    return axios.get(`/admin/manager/${page}${r}`)
}

 export function updateManagerStatus(id,status){
    return axios.post(`/admin/manager/${id}/update_status` , {
        status
    })
 }