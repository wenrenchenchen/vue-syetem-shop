<script setup>
import { ref } from 'vue';

import ListHeader from '~/components/ListHeader.vue'
import {
    getRuleList
} from '~/api/rule.js';

import {
    useInitTable
} from "~/composables/useCommon.js"

const defaultExpandedKeys = ref([])

const {
    loading,
    tableData,
    getData
} = useInitTable({
    getList: getRuleList,
    onGetListSuccess: (res) => {
        tableData.value = res.list
        defaultExpandedKeys.value = res.list.map(o => o.id)

    }
})

</script>
<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增/刷新按钮 -->
        <ListHeader @refresh="getData" />

        <el-tree :data="tableData" :props="{ label: 'name', children: 'child' }" v-loading="loading" node-key="id"
            :default-expanded-keys="defaultExpandedKeys">
            <template #default="{ node,data }">
                <div class="custom-tree-node">
                    <!-- 左边 -->
                    <el-tag  size="small" :type="data.menu ? '' : 'inof' ">{{ data.menu ? "菜单" : "权限" }}</el-tag>
                    <el-icon v-if="data.icon" :size="16" class="ml-2">
                        <component :is="data.icon" />
                    </el-icon>
                    <span>{{ data.name }}</span>

                    <!-- 右边 -->
                    <div class="ml-auto">
                        <el-switch :modelValue="status" :active-value="1" :inactive-value="0" />
                        <el-button text type="primary" size="small" @click="">修改</el-button>
                        <el-button text type="primary" size="small" @click="">增加</el-button>
                        <el-button text type="primary" size="small" @click="">删除</el-button>
                    </div>
                </div>
            </template>
        </el-tree>
    </el-card>




</template>
<style>
.custom-tree-node{
    display: flex;
    flex: 1;
    align-items: center;
    font-size: 14px;
    padding-right: 8px;
}
.el-tree-node__content{
    padding: 20px 0;
}
</style>