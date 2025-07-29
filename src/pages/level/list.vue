<script setup>
import { computed, reactive, ref } from 'vue';
import FormDrawer from '~/components/FormDrawer.vue'
import ListHeader from '~/components/ListHeader.vue'
import {
    getRuleList
} from '~/api/rule'
import {
    getUserLevelList,
    updateUserLevelStatus,
    createUserLevel,
    updateUserLevel,
    deleteUserLevel,

} from '~/api/level';
import { toast } from '~/composables/util'
import { useInitTable, useInitForm } from '~/composables/useCommon.js';


const {
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleDelete,
    handleStatusChange,

} = useInitTable({
    getList: getUserLevelList,
    delete: deleteUserLevel,
    updateStatus: updateUserLevelStatus,
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
        level: "100",
        status: 1,
        discount: 0,
        max_price: 0,
        max_times: 0,
    },
    rules: {
        name: [{
            required: true, //必填的意思
            message: '会员等级不能为空', //提示
            trigger: 'blur' //触发时机，失去焦点的时候
        }],
    },
    getData,
    update: updateUserLevel,
    create: createUserLevel,

})

</script>
<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增/刷新按钮 -->
        <ListHeader @create="handleCreate" @refresh="getData" />
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="name" label="会员等级" />
            <el-table-column prop="discount" label="折扣率" align="center" />
            <el-table-column prop="level" label="等级序号" align="center" />
            <el-table-column label="状态" width="120">
                <template #default="{ row }">
                    <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0"
                        @change="handleStatusChange($event, row)" :disabled="row.super == 1"
                        :loading="row.statusLoading">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="250" align="center">
                <template #default="scope">

                    <!-- 修改 -->
                    <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
                    <!-- 删除 -->
                    <el-popconfirm title="是否要删除该会员" confirm-button-text="确认" cancel-button-text="取消"
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

        <!-- 新增/修改的弹框 -->
        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="等级名称" prop="name">
                    <el-input v-model="form.name" placeholder="等级名称"></el-input>
                </el-form-item>
                <el-form-item label="等级权重" prop="level">
                    <el-input type="number" v-model="form.level" placeholder="等级权重"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
                </el-form-item>
                <el-form-item label="升级条件" prop="level">
                    <div>   
                            <small class="m-1">累计消费满</small>
                            <el-input type="number" v-model="form.max_price" placeholder="累计消费" style="width: 50%;">
                                <template #append>元</template>
                            </el-input>
                            <small class="text-gray-400 flex">
                                设置会员等级所需要的累计消费必须大于等于0,单位：元
                            </small>
                    </div>
                    <div>   
                            <small class="m-1">累计次数满</small>
                            <el-input type="number" v-model="form.max_times" placeholder="累计次数" style="width: 50%;">
                                <template #append>%</template>
                            </el-input>
                            <small class="text-gray-400 flex">
                                设置会员等级所需要的购买量必须大于等于0,单位：笔
                            </small>
                    </div>
                </el-form-item>
                <el-form-item label="折扣率(%)" prop="discount">
                    <el-input type="number" v-model="form.discount" style="width: 50%;">
                        <template #append>%</template>
                    </el-input>
                    <small class="text-gray-400 flex">
                        折扣率单位为百分比，如输入90，表示该会员等级的用户可以以商品原价的90%购买
                    </small>
                </el-form-item>
            </el-form>
        </FormDrawer>


    </el-card>
</template>
<style></style>