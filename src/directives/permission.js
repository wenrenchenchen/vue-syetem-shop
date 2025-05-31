import store from "~/store"
function hasPermission(value,el = false) {
    // 传过来的别名是不是数组
    if(!Array.isArray(value)){
        throw new Error(`需要配置权限,例如 v-permission="['getStatistics3,GET']"`)
    }
    const hasAuth = value.findIndex(v=>store.state.ruleNames.includes(v)) !=-1
    // 对比，如果el(节点)存在并且 没有权限的时候，就移除这个节点
    if(el && !hasAuth){
        el.parentNode && el.parentNode.removeChild(el)
    }
    return hasAuth
}


export default {
    install(app){
         app.directive("permission",{
            mounted(el,binding) {
                
                hasPermission(binding.value,el)
                
            },
         })
         
    }
}