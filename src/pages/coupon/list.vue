<script setup>
import { computed, reactive, ref } from 'vue';
import FormDrawer from '~/components/FormDrawer.vue'
import ListHeader from '~/components/ListHeader.vue'

import {
    getCouponList,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    updateCouponStatus
} from '~/api/coupon';
import { toast } from '~/composables/util'
import { useInitTable, useInitForm } from '~/composables/useCommon.js';



const roles = ref([])
const {
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleDelete
} = useInitTable({
    getList: getCouponList,
    delete: deleteCoupon

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
        type: "",
        value: "",
        total: "",
        min_price: "",
        start_time: "",
        end_time: "",
        order: 50,
    },
    rules: {
        title: [{
            required: true, //必填的意思
            message: '公告名称不能为空', //提示
            trigger: 'blur' //触发时机，失去焦点的时候
        }],
        content: [{
            required: true,
            message: '公告内容不能为空',
            trigger: 'blur'
        }]
    },
    getData,
    update: updateCoupon,
    create: createCoupon,

})





</script>

<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增/刷新按钮 -->
        <ListHeader @create="handleCreate" @refresh="getData" />        
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column  label="优惠券名称" >
                <template #default="{ row }">
                    <div class="border border-dashed py-2 px-4 rounded">
                        <h5 class="font-bold text-md">{{ row.name }}</h5>
                        <small>{{ row.start_time }} ~ {{ row.end_time }}</small>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="statusText" label="状态" />
            <el-table-column  label="优惠" >
                <template #default="{ row }">
                    {{ row.type ? "满减" : "折扣" }}{{ row.type ? ("￥" + row.value) : (row.value+"折") }}
                </template>
            </el-table-column>
            <el-table-column prop="total" label="发布数量" />
            <el-table-column prop="used" label="已使用" />
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
                    <el-popconfirm title="是否要删除该公告" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row.id)">
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


        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="form.title" placeholder="公告标题"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>

</template>

<style></style>