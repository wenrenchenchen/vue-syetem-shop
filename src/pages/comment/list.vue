<script setup>
import { ref } from 'vue';

import {
    getGoodsCommentList,
    updateGoodsCommentStatus,

} from '~/api/goods_comment.js';
import ChooseImage from '~/components/ChooseImage.vue'
import { useInitTable} from '~/composables/useCommon.js';
import Search from '~/components/Search.vue';
import SearchItem from '~/components/SearchItem.vue';

const user_level = ref([])

// 搜索/分页 功能- 修改状态/删除
const roles = ref([])
const {
    searchForm,
    resetSearchForm,
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleStatusChange,
    handleDelete
} = useInitTable({
    searchForm: {
        title: "",
    },
    getList: getGoodsCommentList,
    onGetListSuccess: (res) => {
        tableData.value = res.list.map(o => {
            o.statusLoading = false
            return o
        })
        total.value = res.totalCount
        user_level.value = res.user_level

    },
    updateStatus: updateGoodsCommentStatus,
})





</script>

<template>
    <el-card shadow="never" class="border-0">
        <!-- 搜索 -->
        <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
            <SearchItem label="关键词">
                <el-input v-model="searchForm.title" placeholder="商品标题" clearable></el-input>
            </SearchItem>


        </Search>

        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column label="会员" width="200">
                <template #default="{ row }">
                    <div class="flex items-center">
                        <!-- 头像 -->
                        <el-avatar :size="40" :src="row.avatar">
                            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                        </el-avatar>
                        <!-- id -->
                        <div class="ml-3">
                            <h6>{{ row.username }}</h6>
                            <small>ID:{{ row.id }}</small>
                        </div>
                    </div>

                </template>
            </el-table-column>

            <el-table-column label="会员等级" align="center">
                <template #default="{ row }">
                    {{ row.user_level?.name || "-" }}
                </template>
            </el-table-column>
            <el-table-column label="登录注册" align="center">
                <template #default="{ row }">
                    <p v-if="row.last_login_time">
                        最后登录 : {{ row.last_login_time }}
                    </p>
                    <p>
                        注册时间 : {{ row.create_time }}
                    </p>

                </template>
            </el-table-column>

            <el-table-column label="状态" width="100">
                <template #default="{ row }">
                    <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0"
                        @change="handleStatusChange($event, row)" :disabled="row.super == 1"
                        :loading="row.statusLoading">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <small v-if="scope.row.super == 1" class="text-sm text-gray-500">暂无操作</small>
                    <div v-else>
                        <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
                        <el-popconfirm title="是否要删除该记录" confirm-button-text="确认" cancel-button-text="取消"
                            @confirm="handleDelete(scope.row.id)">
                            <template #reference>
                                <el-button class="px-1" text type="primary" size="small">
                                    删除
                                </el-button>
                            </template>
                        </el-popconfirm>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <!-- 下 ：分页 -->
        <div class="flex items-center justify-center mt-5">
            <el-pagination background layout="prev,pager,next" :total="total" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>
    </el-card>

</template>

<style></style>