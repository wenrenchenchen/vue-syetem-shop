<script setup>

</script>
<template>
    <el-main class="image-main">
        <!-- 上 ：内容标题 -->
        <div class="top">
            <div v-for="i in 100" :key="i">{{ i }}</div>
        </div>
        <!-- 下 ：分页 -->
        <div class="bottom">
            分页
        </div>
    </el-main>
</template>
<style>
.image-main {
    position: relative;
}
.image-main .top{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 10px;
    overflow-y: auto;
}
.image-main .bottom{
    position: absolute;
    height: 50px;
    right: 0;
    left: 0;
    bottom: 0;
    @apply flex items-center justify-center;
}
</style>