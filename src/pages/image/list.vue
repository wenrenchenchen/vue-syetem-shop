<script setup>
import ImageAside from '~/components/ImageAside.vue';
import ImageMain from '~/components/ImageMain.vue';
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 - 44 - 40

</script>

<template>

    <el-container class="bg-white rounded" :style = "{ height: (h + 'px') }">
        <!-- A头部 -->
        <el-header class="image-header">Header</el-header>
        <el-container>
            <!-- B侧边 -->
            <ImageAside />
            <!-- C内容 -->
            <ImageMain />
        </el-container>
    </el-container>

</template>

<style>
.image-header{
    border-bottom: 1px solid #eeeeee;
    @apply flex items-center;
}


</style>