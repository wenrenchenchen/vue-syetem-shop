<!-- 后台首页 -->
<script setup>
    import { useCookies } from '@vueuse/integrations/useCookies'
    const cookie = useCookies()

    console.log(cookie);
    function set() {
        cookie.set("admin-token","22222")
    }
    function get() {
        
        console.log(cookie.get("admin-token"));
        
    }
    function remove() {
        cookie.remove("admin-token")
    }
</script>

<template>
    <div>
        后台首页
        <el-button @click="set">设置</el-button>
        <el-button @click="get">读取</el-button>
        <el-button @click="remove">删除</el-button>
    </div>
</template>

<style>

</style>