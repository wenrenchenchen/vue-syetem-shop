<script setup>
import { ref } from 'vue'
import { useRoute,onBeforeRouteUpdate } from 'vue-router'
import { useCookies } from '@vueuse/integrations/useCookies'
const route = useRoute()
const cookie = useCookies()

const activeTab = ref(route.path)
const tabList = ref([
    {
        title: '后台首页',
        path:"/"
    },

    
])

//添加标签导航
function addTab(tab) {
    let noTab = tabList.value.findIndex(t=>t.path == tab.path) == -1
    if(noTab) {
        tabList.value.push(tab)
    }
    // 让标签刷新后也不消失，即持久化存储
    cookie.set("tabList",tabList.value)
}

// 初始化标签导航列表
function initTabList(){
    let tab = cookie.get("tabList")
    if(tab) {
        tabList.value = tab
    }
}

initTabList()

onBeforeRouteUpdate((to,from)=>{
    // 当前激活状态也就是当前路由
    activeTab.value = to.path
    addTab({
        title:to.meta.title,
        path:to.path
    })
})

const changeTab = (t) =>{
    activeTab.value = t
    route.push(t)
}

const removeTab = (t) => {
    let tabs = tabList.value
    let a = activeTab.value
    if(a == t){
        tabs.forEach((tab,index)=>{
            if(tab.path == t){
                const nexTab = tab[index+1] || tabs[index-1]
                if(nexTab){
                    a = nexTab.path
                }
            }
        })
    }

    activeTab.value = a
    tabList.value = tabList.value.filter(tab=> tab.path != t)

    cookie.set("tabList",tabList.value)
}
</script>

<template>
    <div class="f-tag-list" :style="{ left: $store.state.asidWidth }">
        <!-- 标签 -->
        <el-tabs v-model="activeTab" type="card" class="demo-tabs" 
        @tab-remove="removeTab"  style="min-width: 100px;" 
        @tab-change="changeTab">
            <el-tab-pane :closable="item.path != '/' ? true : false" v-for="item in tabList" :key="item.path" :label="item.title" :name="item.path">
            </el-tab-pane>
        </el-tabs>

        <!-- 下拉框 -->
        <span class="tag-btn">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <el-icon >
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </span>
    </div>
    <!-- <div style="height: 44px;"></div> -->
</template>
<style>
.el-icon--right {
    margin-left: 0;
}

.el-main {
    --el-main-padding: 0;
}

.f-tag-list {
    @apply bg-gray-100 flex items-center justify-center px-2;
    top: 64px;
    right: 0;
    height: 44px;
    z-index: 100;
}

.tag-btn {
    @apply bg-white rounded ml-auto flex items-center justify-center;
    height: 32px;
    width: 32px;
}

.el-tabs__header {
    margin: 0;

}

.el-tabs__nav {
    border: 0 !important;
}

.el-tabs__item {
    border: 0 !important;
    height: 32px;
    line-height: 32px;
    @apply bg-white mx-1 rounded;
}
.el-tabs__nav-next, .el-tabs__nav-prev{
    line-height: 32px;
    height: 32px;
}
.is-disabled {
    cursor: not-allowed;
    @apply text-gray-300;
}
.el-tabs--card>.el-tabs__header{
    border: 0;
}
</style>