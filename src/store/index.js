import { createStore } from 'vuex'
import {  login,getinfo } from '~/api/manager'
import {
    setToken,
    removeToken
} from '~/composables/auth'

const store = createStore({
  state () {
    return {
      //用户信息
      user:{},
      //侧边宽度
      asideWidth:"250px",
      
      menus:[], //渲染后端数据，第一步return

      ruleNames:[],
    }
  },
  mutations: {
    //记录用户信息
    SET_USERINFO(state,user){
        state.user = user
    },
    //展开收起 侧边
    handleAsideWidth(state){
      state.asideWidth = state.asideWidth == "250px" ? "64px" : "250px"
    },
    SET_MENUS(state,menus){//渲染后端数据，第二步设置传参
      state.menus = menus
    },
    SET_RULENAMES(state,ruleNames){
      state.ruleNames = ruleNames
    },
  },
  actions: {


    //获取当前登录用户信息
    getinfo({ commit }){
        return new Promise((resolve,reject) => {
            getinfo().then(res => {
                commit("SET_USERINFO",res)
                commit("SET_MENUS",res.menus)//渲染后端数据，第三步渲染 第四步去menu页面 将数据绑定
                commit("SET_RULENAMES",res.ruleNames)
                resolve(res)
            }).catch(err=>{
                reject(err)
            })
        })
    },
    // 登录
    login({ commit } ,{ username,password}){
      return new Promise((resolve,reject) => {
        login(username,password).then(res=> {
           //存储token和用户相关信息
            setToken(res.token)
            resolve(res)
        }).catch(err=>{
             reject(err)
        })
      })
    },
    //退出登录
    logout({ commit }){
      //  移除cookie里的token 
        removeToken()
      // 清除当前用户状态 vuex
      commit("SET_USERINFO",{})

    }

  }
})

export default store