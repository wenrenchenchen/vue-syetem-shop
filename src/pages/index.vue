<!-- 后台首页 -->
<script setup>
import { showModal } from '~/composables/util'
import { logout } from '~/api/manager'
import { toast } from '~/composables/util'
import { useRouter } from 'vue-router'

import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()
    function handleLogout(){
        showModal("是否要退出登录?")
        .then(res=>{
            logout()
            .finally(()=> {
                //将这两个 封装到vuex的actions里 移除cookie里的token and 清除当前用户状态 vuex
                store.dispatch("logout")

                //跳转到登录页面    
                router.push('/login')
                //提示退出登录成功
                toast("退出登录成功")

            })

        })

    }
</script>

<template>
    <div>
        后台首页
        {{ $store.state.user.username }}
        <el-button @click="handleLogout">退出登录</el-button>
    </div>
</template>

<style>
    
</style>