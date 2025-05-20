<script setup>
    import { showModal } from '~/composables/util'
    import { logout } from '~/api/manager'
    import { toast } from '~/composables/util'
    import { useRouter } from 'vue-router'
    import { ref, reactive } from 'vue'
    import { useStore } from 'vuex'
    import { useFullscreen } from '@vueuse/core'
    import { updatepassword } from '../../api/manager'

    // 引入vueuse的方法，实现全屏显示
    const {
        // 是否全屏
        isFullscreen,
        // 切换全屏  
        toggle 
        } = useFullscreen()

    const router = useRouter()
    const store = useStore()
    
    
    // 修改密码
    const showDrawer = ref(false)
    const form = reactive({
        oldpassword:'',
        password:'',
        repassword:'',

    })
    const rules = {
        oldpassword: [
            {
                required: true, //必填的意思
                message: '旧密码不能为空', //提示
                trigger: 'blur' //触发时机，失去焦点的时候
            },

        ],
        password: [
            {
                required: true, //必填的意思
                message: '新密码不能为空', //提示
                trigger: 'blur' //触发时机，失去焦点的时候
            },

        ],
        repassword: [
            {
                required: true, //必填的意思
                message: '再次输入新密码', //提示
                trigger: 'blur' //触发时机，失去焦点的时候
            },

        ],
    }
    // 让表单变成响应式
    const formRef = ref(null)
    const loading = ref(false) //防止登录重复请求，每一次点击应都是等上一次请求结束再请求
    const onSubmit = () => {
        // 调用 validate 方法验证表单
        formRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            loading.value = true  //loading为true 则在请求
            updatepassword(form)
            .then(res=>{
                toast("修改密码成功，请重新登录")
                //移除cookie里的token and 清除当前用户状态 vuex
                store.dispatch("logout")
                //跳转到登录页面    
                router.push('/login')
            })
            .finally(()=>{
                loading.value = false
            })
        })

    }




    // 对下拉菜单监听
    const handleCommand = (c)=>{
        switch (c){
            case "logout":
                handleLogout();
                break;
            case "rePassword":
                showDrawer.value = true;    
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
                content="全屏"
                placement="bottom"
            >
                <el-icon class="icon-btn" @click="toggle">
                    <FullScreen v-if="!isFullscreen" />
                    <Aim v-else/>
                </el-icon>
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
    <!-- 修改密码的抽屉 -->
    <el-drawer v-model="showDrawer" title="修改密码" size="45%" close-on-click-modal="false">
        <el-form ref="formRef" :rules="rules" :model="form" size="small">

                <el-form-item prop="oldpassword" label="旧密码">
                    <el-input v-model="form.oldpassword" placeholder="请输入旧密码">
                    </el-input>
                </el-form-item>

                <el-form-item prop="password" label="新密码">
                    <el-input v-model="form.password" placeholder="请输入新密码" type="password" show-password>
                    </el-input>
                </el-form-item>
                <el-form-item prop="repassword" label="确认密码">
                    <el-input v-model="form.repassword" placeholder="请再次输入新密码" type="password" show-password>
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button  class="button-1" type="primary" @click="onSubmit" :loading="loading">提交</el-button>
                </el-form-item>

            </el-form>
    </el-drawer>




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
    label {
        width: 80px;
    }
</style>
