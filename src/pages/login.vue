<!-- 登录页面 -->
<script setup>
import { ref, reactive } from 'vue'
import { login, getinfo } from '~/api/manager'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'
import {
    setToken,
} from '~/composables/auth'




// do not use same name with ref
const form = reactive({
    username: '',
    password: '',
})

const router = useRouter()

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
        login(form.username, form.password)
        .then(res => {
        // token的位置
        // console.log(res.data.data);
        // 设置了响应拦截器
            console.log(res);


            //提示成功
            ElNotification({
              message: "登录成功",
              type: 'success',
              duration: 3000
            })

            //存储token和用户相关信息
            setToken(res.token)
            // const cookie = useCookies()

            // // cookie.set("admin-token",res.data.data.token)
            // // 设置了响应拦截器
            // cookie.set("admin-token", res.token)

            // 获取用户相关信息
            getinfo().then(res2 => {
                console.log(res2);

        })


            //跳转到后台首页
            router.push('/')
        })
        // 用catch捕获错误信息
        // .catch(err => {
        // console.log(err.response.data.msg);
        // 弹出错误提示 ，设置了响应拦截器，直接在axios那边处理
        // ElNotification({
        //     message: err.response.data.msg || "请求失败",
        //     type: 'error',
        //     duration:3000
        // })
        // })
        .finally( () => {
            loading.value = false
        })
    }) 


}



const rules = {
    username: [
        {
            required: true, //必填的意思
            message: '用户名不能为空', //提示
            trigger: 'blur' //触发时机，失去焦点的时候
        },

    ],
    password: [
        {
            required: true, //必填的意思
            message: '密码不能为空', //提示
            trigger: 'blur' //触发时机，失去焦点的时候
        },

    ],
}

</script>

<template>
    <el-row class="row">
        <!-- 左边  xs 手机  sm平板 span固定住了-->
        <el-col class="col-1" :xs="0" :sm="16">
            <!-- <el-col class="col-1" :span="16"> -->
            <div class="div-1">
                <div class="text-1">欢迎光临</div>
                <div class="text-2">Hello,welcome to my system!</div>
            </div>
        </el-col>

        <!-- 右边 -->
        <el-col class="col-2" :xs="24" :sm="8">
            <h2>欢迎回来</h2>
            <div class="div-2">
                <span>&nbsp;</span>
                <span>账号密码登录</span>
                <span>&nbsp;</span>
            </div>
            <!-- 输入框 -->
            <el-form ref="formRef" :rules="rules" :model="form">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <!-- elementplus 插槽引入 图标 -->
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <User />
                            </el-icon>
                        </template>
                    </el-input>

                </el-form-item>

                <el-form-item prop="password">
                    <el-input v-model="form.password" placeholder="请输入密码" type="password" show-password>
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button round class="button-1" type="primary" @click="onSubmit" :loading="loading">登
                        录</el-button>
                </el-form-item>

            </el-form>
        </el-col>
    </el-row>
</template>

<style scoped>
.row {
    min-height: 100vh;
    background-color: rgb(184, 130, 215);
}

.col-1 {
    display: flex;
    justify-content: center;
    align-items: center;
}

.col-2 {
    background-color: aliceblue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.text-1 {
    font-size: 48px;
    font-weight: bold;
    color: #f0f3f5;
    padding: 15px;
    margin-left: -12px;
}

.text-2 {
    font-size: 18px;
    color: #edebeb;
}

.col-2 h2 {
    font-weight: bold;
    font-size: 32px;
    color: rgb(63, 62, 62);
}

.div-2 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 16px;
}

.div-2 span:nth-child(1),
.div-2 span:nth-child(3) {

    width: 64px;
    border-top: 2px solid #d2d1d1;
    border-left: none;
    border-right: none;
    height: 1px;
    border-radius: 10px;
}

.div-2 span:nth-child(2) {
    margin: 0 8px;
    color: #bcbbbb;
}

.form-0 {
    width: 250px;

}

.button-1 {
    width: 250px;
    background-color: rgb(184, 130, 215);

}

.button-1:hover {
    background-color: rgb(200, 153, 213);
}

.button-1:active {
    background-color: rgb(140, 80, 180);
}
</style>