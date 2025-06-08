<script setup>
import { computed, reactive, ref } from 'vue';
import FormDrawer from '~/components/FormDrawer.vue'
import ListHeader from '~/components/ListHeader.vue'
import TagInput from '~/components/TagInput.vue'

import {
    getSkusList,
    updateSkusStatus,
    createSkus,
    updateSkus,
    deleteSkus,
} from '~/api/skus';
import { toast } from '~/composables/util'
import { useInitTable, useInitForm } from '~/composables/useCommon.js';


const {
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleDelere,
    handleStatusChange,
} = useInitTable({
    getList: getSkusList,
    delete: deleteSkus,
    updateStatus: updateSkusStatus,
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
    handleEdit,

} = useInitForm({
    form: {
        name: "",
        default: "",
        status: 1,
        order:50
    },
    rules: {
        name: [{
            required: true, //必填的意思
            message: '规格名称不能为空', //提示
            trigger: 'blur' //触发时机，失去焦点的时候
        }],
        default: [{
            required: true, //必填的意思
            message: '规格值不能为空', //提示
            trigger: 'blur' //触发时机，失去焦点的时候
        }],
    },
    getData,
    update: updateSkus,
    create: createSkus,

})


</script>
<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增/刷新按钮 -->
        <ListHeader @create="handleCreate" @refresh="getData" />
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="name" label="规格名称" />
            <el-table-column prop="default" label="规格值" width="380" />
            <el-table-column prop="order" label="排序" />
            <el-table-column label="状态" width="120">
                <template #default="{ row }">
                    <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0"
                        @change="handleStatusChange($event, row)" :disabled="row.super == 1"
                        :loading="row.statusLoading">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">

                    <!-- 修改 -->
                    <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
                    <!-- 删除 -->
                    <el-popconfirm title="是否要删除该规格" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelere(scope.row.id)">
                        <template #reference>
                            <el-button class="px-1" text type="primary" size="small">
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- 下 ：分页 -->
        <div class="flex items-center justify-center mt-5">
            <el-pagination background layout="prev,pager,next" :total="total" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>

        <!-- 新增/修改的弹框 -->
        <FormDrawer  destroyOnClose ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="规格名称" prop="name">
                    <el-input v-model="form.name" placeholder="规格名称"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="form.order":min="0" :max="1000" ></el-input-number>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="规格值" prop="default">
                    <TagInput v-model="form.default"/>
                </el-form-item>
            </el-form>
        </FormDrawer>

    </el-card>
</template>
<style></style>