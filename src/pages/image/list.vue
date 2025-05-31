<script setup>
const windowHeight = window.innerHeight || document.body.clientHeight
const h = windowHeight - 64 - 44 - 40

</script>

<template>

    <el-container class="bg-white rounded" :style = "{ height: (h + 'px') }">
        <!-- A头部 -->
        <el-header class="image-header">Header</el-header>
        <el-container>
            <!-- B侧边 -->
            <el-aside width="220px" class="image-aside">
                <!-- 上 ：内容标题 -->
                <div class="top">
                    <div v-for="i in 100" :key="i">{{ i }}</div>
                </div>
                <!-- 下 ：分页 -->
                <div class="bottom">
                    分页
                </div>
            </el-aside>
            <!-- C内容 -->
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
        </el-container>
    </el-container>

</template>

<style>
.image-header{
    border-bottom: 1px solid #eeeeee;
    @apply flex items-center;
}

.image-aside{
    border-right: 1px solid #eeeeee;
    position: relative;
}
.image-main {
    position: relative;
}
.image-aside .top,.image-main .top{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 10px;
    overflow-y: auto;
}
.image-aside .bottom,.image-main .bottom{
    position: absolute;
    height: 50px;
    right: 0;
    left: 0;
    bottom: 0;
    @apply flex items-center justify-center;
}
</style>