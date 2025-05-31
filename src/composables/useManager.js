import { ref, reactive } from 'vue'
import { logout,updatepassword } from '~/api/manager'
import {  showModal,toast } from '~/composables/util'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
// 修改密码
export function useRepassword() {
    const router = useRouter()
    const store = useStore()
    // 修改密码
    const formDrawerRef = ref(null)
    // const showDrawer = ref(false)
    const form = reactive({
        oldpassword: '',
        password: '',
        repassword: '',

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
    // const loading = ref(false) //防止登录重复请求，每一次点击应都是等上一次请求结束再请求
    const onSubmit = () => {
        // 调用 validate 方法验证表单
        formRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            // loading.value = true  //loading为true 则在请求
            formDrawerRef.value.showLoading()
            updatepassword(form)
                .then(res => {
                    toast("修改密码成功，请重新登录")
                    //移除cookie里的token and 清除当前用户状态 vuex
                    store.dispatch("logout")
                    //跳转到登录页面    
                    router.push('/login')
                })
                .finally(() => {
                    // loading.value = false
                    formDrawerRef.value.hideLoading()
                })
        })

    }

    const openRePasswordFrom = () => formDrawerRef.value.open()

    return {
        formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePasswordFrom
    }
}
//退出登录
export function useLogout() {
    const router = useRouter()
    const store = useStore()
    function handleLogout() {
        showModal("是否要退出登录?")
            .then(res => {
                logout().finally(() => {
                        //将这两个 封装到vuex的actions里 移除cookie里的token and 清除当前用户状态 vuex
                        store.dispatch("logout")

                        //跳转到登录页面    
                        router.push('/login')
                        //提示退出登录成功
                        toast("退出登录成功")

                    })

            })
    }

    return {
        handleLogout
    }
}