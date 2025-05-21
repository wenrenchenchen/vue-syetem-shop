<script setup>

    import { ref } from 'vue'
    const showDrawer = ref(false)


    // 动态的抽屉标题和 抽屉大小
    const props = defineProps({
        title:String,
        size:{
            type:String,
            default:"45%"
        },
        destroyOnClose:{
            type:Boolean,
            default:false
        },
        consfirmText:{
            type:String,
            default:"提交"
        }
    })

    // 打开
    const open = () => showDrawer.value = true

    // 关闭
    const close = () => showDrawer.value = false

    //提交
    const emit = defineEmits(["submit"])
    const submit = ()=> emit("submit")

    const loading = ref(false) //防止登录重复请求，每一次点击应都是等上一次请求结束再请求
    const showLoding = ()=> loading.value = true
    const hideLoding = ()=> loading.value = false


    //向父组件暴露以下方法
    defineExpose({
        open,
        close,
        showLoding,
        hideLoding
    })

</script>
<template>
    <el-drawer v-model="showDrawer" :title="title" :size="size"  :destroy-on-close="destroyOnClose" >
        <div class="formDrawer">
            <div class="body">
                <slot></slot>
            </div>
            <div class="actions">
                <el-button  class="button-1" type="primary" @click="submit" :loading="loading"> {{ consfirmText }} </el-button>
                <el-button  class="button-1" type="default" @click="close">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<style>


    .formDrawer {
        display: flex;
        width: 100%;
        height: 100%;
        position: relative;

        
    }

    .formDrawer .body {
        flex: 1;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        overflow-y: auto;
    }

    .formDrawer .actions {
        display: flex;
        align-items: center;
        height: 50px;
        margin-top: auto;
    }
</style>