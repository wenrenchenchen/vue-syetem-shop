<script setup>
import { KeepAlive } from 'vue';
import FHeader from './components/FHeader.vue';
import FMenu from './components/FMenu.vue';
import FTagList from './components/FTagList.vue';

</script>
<template>
    <el-container>
        <!-- 上 -->
        <el-header>
            <f-header />
        </el-header>

        <!-- 下 -->
        <el-container>
            <el-aside :width="$store.state.asideWidth">
                <f-menu />
            </el-aside>
            <el-main>
                <!-- 标签导航 -->
                <f-tag-list />
                <!-- 内容 -->
                <router-view v-slot="{ Component }">
                    <!-- <keep-alive :max="10">
                        <component :is="Component"></component>
                    </keep-alive> -->
                    <transition name="fade">
                        <KeepAlive :max="10">
                            <component :is="Component"></component>
                        </KeepAlive>
                    </transition>

                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<style>
.el-aside {
    transition: all 0.2s;
}

/* 进入之前的过渡动画 */
.fade-enter-from {
    opacity: 0;
}

/* 进入之后 */
.fade-enter-to {
    opacity: 1;
}

/* 离开之前 */
.fade-leave-from {
    opacity: 1;
}

/* 离开之后 */
.fade-leave-to {
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}

/* 进入的时候延迟一下 */
.fade-enter-active {
    transition-delay: 0.3s;
}
</style>