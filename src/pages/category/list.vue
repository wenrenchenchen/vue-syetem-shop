<script setup>
import { ref } from 'vue';

import ListHeader from '~/components/ListHeader.vue'
import FormDrawer from '~/components/FormDrawer.vue'
import GoodsDrawer from './components/GoodsDrawer.vue';
import {
    getCategoryList,
    createCategory,
    updateCategory,
    deleteCategory,
    updateCategoryStatus,
    getCategoryGoods
} from '~/api/category.js';

import {
    useInitTable,
    useInitForm
} from "~/composables/useCommon.js"


const {
    loading,
    tableData,
    getData,
    handleStatusChange,
    handleDelete
} = useInitTable({
    getList: getCategoryList,
    onGetListSuccess: (res) => {
        tableData.value = res.map(o=>{
            o.goodsDrawerLoading = false
            return o
        })


    },
    updateStatus: updateCategoryStatus,
    delete: deleteCategory
})


// 新增/修改/删除
const {
    drawerTitle,
    formDrawerRef,
    formRef,
    form,
    rules,
    handleSubmit,
    handleCreate,
    handleEdit

} = useInitForm({
    form: {
        name: "",
    },
    rules: {

    },
    getData,
    update: updateCategory,
    create: createCategory,

})


const GoodsDrawerRef = ref(null)

const openGoodsDrawer = (data) => GoodsDrawerRef.value.open(data)

</script>
<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增按钮 -->
        <ListHeader @create="handleCreate" @refresh="getData" />

        <el-tree :data="tableData" :props="{ label: 'name', children: 'child' }" v-loading="loading" node-key="id"
            >
            <template #default="{ node, data }">
                <div class="custom-tree-node">
                    <!-- 左边 -->

                    <span>{{ data.name }}</span>

                    <!-- 右边 -->
                    <div class="ml-auto">
                        <el-button text type="primary" size="small" @click="openGoodsDrawer(data)" :loading="data.goodsDrawerLoading" >推荐商品</el-button>
                        <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0"
                            @change="handleStatusChange($event, data)" />
                        <el-button text type="primary" size="small" @click.stop="handleEdit(data)">修改</el-button>
                        
                        <el-popconfirm title="是否要删除该记录?" confirm-button-text="确认" cancel-button-text="取消"
                            @confirm="handleDelete(data.id)">
                            <template #reference>
                                <el-button text type="primary" size="small" @click="">删除</el-button>
                            </template>
                        </el-popconfirm>

                    </div>
                </div>
            </template>
        </el-tree>


        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules"  :inline="false">

                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="form.name"  placeholder="分类名称"></el-input>
                </el-form-item>

            </el-form>
        </FormDrawer>

        <GoodsDrawer ref="GoodsDrawerRef">

        </GoodsDrawer>
    </el-card>




</template>
<style>
.custom-tree-node {
    display: flex;
    flex: 1;
    align-items: center;
    font-size: 14px;
    padding-right: 8px;
}

.el-tree-node__content {
    padding: 20px 0;
}
</style>