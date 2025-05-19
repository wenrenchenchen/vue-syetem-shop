<script setup>
    import { showModal } from '~/composables/util'
    import { logout } from '~/api/manager'
    import { toast } from '~/composables/util'
    import { useRouter } from 'vue-router'

    import { useStore } from 'vuex'
    const router = useRouter()
    const store = useStore()

    // 对下拉菜单监听
    const handleCommand = (c)=>{
        switch (c){
            case "logout":
                handleLogout();
                break;
            case "rePassword":
                console.log("修改密码")     
                break;
        }
        
    }

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
    const handleRefresh = ()=>location.reload()
</script>
<template>
    <div class="f-header">

        <span class="logo">
            <el-icon class="logo-00"><Avatar /></el-icon>
            AHC
        </span>
        <el-icon class="icon-btn"><fold /></el-icon>
        <!-- 文字提示 -->
        <el-tooltip  
            effect="dark"
            content="刷新"
            placement="bottom"
        >
            <el-icon class="icon-btn" @click="handleRefresh"><refresh /></el-icon>
        </el-tooltip>

       
        <div class="header-right">
            <el-tooltip  
                effect="dark"
                content="全屏显示"
                placement="bottom"
            >
                <el-icon class="icon-btn" ><FullScreen /></el-icon>
            </el-tooltip>

            <!-- 下拉菜单 -->
            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="dropdown-link">
                    <el-avatar class="avatar" :size="25" :src="$store.state.user.avatar" />
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>

        </div>
    </div>
</template>
<style>
    .f-header {
        display: flex;
        background-color: rgb(184, 80, 215);
        color: hsl(214, 100%, 99%);
        height: 64px;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;   
        align-items: center;
    }
    .header-right {
        margin-left: auto;
        display: flex;
        align-items: center;
    }
    .logo {
        display: flex;
        width: 250px;
        justify-content: center;
        align-items: center;
        font-size: 1.1rem;
        line-height: 1.75rem;
        font-weight: 500;
    }
    .logo-00 {
        margin-right: 0.25rem;
    }
    .icon-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 42px;
        height: 64px;
        cursor: pointer;
    }

    .icon-btn:hover{
        background-color: rgb(202, 136, 217);
    }

    .f-header .dropdown {
        height: 64px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 1rem;
        margin-right: 1rem
    }
    .dropdown-link {
        display: flex;
        justify-content: center;
        align-items: center;
        color: hsl(214, 100%, 99%);
    }
    .avatar {
        margin-right: 0.5rem;
    }
</style>
