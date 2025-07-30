<script setup>
import { ref } from 'vue';

import {
    getGoodsCommentList,
    updateGoodsCommentStatus,

} from '~/api/goods_comment.js';
import ChooseImage from '~/components/ChooseImage.vue'
import { useInitTable } from '~/composables/useCommon.js';
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
             <el-table-column type="expand">
                <template #default="{ row }">
                    <div class="flex pl-18" >
                        <!-- 头像 -->
                        <el-avatar :size="50" shape="circle" :src="row.user.avatar" fit="fill" class="mr-3"></el-avatar>
                        <div class="flex-1">
                            <h6 class="flex items-center">
                                {{ row.user.nickname || row.user.username }}
                                <small class="text-gray-400 ml-2">{{ row.review_time }}</small>
                                <el-button  size="small" class="ml-auto">回复</el-button>
                            </h6>
                            {{ row.review_data }}
                            <div class="py-2">
                                <el-image v-for="(item,index) in row.review.image" :key="index" 
                                :src="item" fit="cover" :lazy="true" style="width: 100px;height:100px" class="rounded"></el-image>
                            </div>

                            <div class="mt-3 bg-gray-100 p-3 rounded" v-for="(item,index) in row.review.extra" :key="index">
                                <h6 class="flex font-bold">
                                    客服
                                    <el-button type="info" size="small" >修改</el-button>
                                </h6>
                                <p>{{ item.data }}</p>
                                
                            </div>

                        </div>
                    </div>
                </template>
             </el-table-column>


            <el-table-column label="ID" width="70" align="center" prop="id"></el-table-column>
            <el-table-column label="商品" width="200">
                <template #default="{ row }">
                    <div class="flex items-center">
                        <el-image :src="row.goods_item ? row.goods_item.cover : ''" fit="fill" :lazy="true"
                            style="width: 50px;height: 50px;" class="rounded"></el-image>
                        <!-- id -->
                        <div class="ml-3">
                            <h6>{{ row.goods_item?.title ?? '商品已被删除' }}</h6>
                        </div>
                    </div>

                </template>
            </el-table-column>

            <el-table-column label="评价信息" width="200">
                <template #default="{ row }">
                    <p>用户 : {{ row.user.nickname || row.user.username }}</p>
                    <p>
                        <el-rate 
                        v-model="row.rating" 
                        disabled 
                        show-score 
                        text-color="#ff9900"/>
                    </p>
                </template>
            </el-table-column>

            <el-table-column label="评价时间" width="180" align="center" prop="review_time"></el-table-column>

            <el-table-column label="状态" >
                <template #default="{ row }">
                    <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0"
                        @change="handleStatusChange($event, row)" :disabled="row.super == 1"
                        :loading="row.statusLoading">
                    </el-switch>
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