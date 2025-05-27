<script setup>
import FHeader from './components/FHeader.vue';
import FMenu from './components/FMenu.vue';
import FTagList from './components/FTagList.vue';

</script>
<template>
    <el-container>
        <!-- 上 -->
        <el-header>
            <f-header/>
        </el-header>

        <!-- 下 -->
        <el-container>
            <el-aside :width="$store.state.asideWidth">
                <f-menu/>
            </el-aside>
            <el-main>
                <!-- 标签导航 -->
                <f-tag-list/>
                <!-- 内容 -->
                <router-view v-slot="{ Component}">
                    <!-- <keep-alive :max="10">
                        <component :is="Component"></component>
                    </keep-alive> -->
                    <keep-alive :max="10">
                        <component :is="Component"></component>
                    </keep-alive>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<style>
.el-aside {
    transition: all 0.2s;
}
</style>