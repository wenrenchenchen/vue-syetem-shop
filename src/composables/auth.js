import { useCookies } from '@vueuse/integrations/useCookies'
const TokenKey = "admin-token"
const cookie = useCookies()

//获取token
export function getToken(){
    return cookie.get(TokenKey)
}

//设置
export function setToken(token){
    return cookie.set(TokenKey,token)
}

//清除
export function removeToken(){
    return cookie.remove(TokenKey)
}


