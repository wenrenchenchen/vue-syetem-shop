<script setup>
import { ref } from 'vue';
import ImageAside from '~/components/ImageAside.vue';
import ImageMain from '~/components/ImageMain.vue';



const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 - 44 - 40

const ImageAsideRef = ref(null)

const handleOpenCreate = ()=> ImageAsideRef.value.handleCreate()
</script>

<template>

    <el-container class="bg-white rounded" :style = "{ height: (h + 'px') }">
        <!-- A头部 -->
        <el-header class="image-header">
            <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
        </el-header>
        <el-container>
            <!-- B侧边 -->
            <ImageAside ref="ImageAsideRef" />
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