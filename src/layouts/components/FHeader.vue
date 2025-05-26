<script setup>

import { useFullscreen } from '@vueuse/core'
import FormDrawer from '~/components/FormDrawer.vue'
import { useRepassword,useLogout } from '~/composables/useManager'
// 引入vueuse的方法，实现全屏显示
const {
    // 是否全屏
    isFullscreen,
    // 切换全屏  
    toggle
} = useFullscreen()

const {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePasswordFrom
} = useRepassword()

const {
    handleLogout
} = useLogout()

// 对下拉菜单监听
const handleCommand = (c) => {
    switch (c) {
        case "logout":
            handleLogout();
            break;
        case "rePassword":
            // showDrawer.value = true;    
            openRePasswordFrom()
            break;
    }

}

// 刷新
const handleRefresh = () => location.reload()

</script>
<template>
    <div class="f-header">

        <span class="logo">
            <el-icon class="logo-00">
                <Avatar />
            </el-icon>
            AHC
        </span>
        <el-icon class="icon-btn">
            <fold />
        </el-icon>
        <!-- 文字提示 -->
        <el-tooltip effect="dark" content="刷新" placement="bottom">
            <el-icon class="icon-btn" @click="handleRefresh">
                <refresh />
            </el-icon>
        </el-tooltip>


        <div class="header-right">
            <el-tooltip effect="dark" content="全屏" placement="bottom">
                <el-icon class="icon-btn" @click="toggle">
                    <FullScreen v-if="!isFullscreen" />
                    <Aim v-else />
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
    <!-- <el-drawer v-model="showDrawer" title="修改密码" size="45%" close-on-click-modal="false">
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

            </el-form>
    </el-drawer> -->
    <form-drawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">
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

        </el-form>
    </form-drawer>



</template>
<style>
.f-header {
    display: flex;
    /* background-color: rgb(184, 80, 215); */
    background-color: rgb(68, 215, 188);
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

.icon-btn:hover {
    background-color: rgb(133, 215, 200);
    /* background-color: rgb(202, 136, 217); */
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
