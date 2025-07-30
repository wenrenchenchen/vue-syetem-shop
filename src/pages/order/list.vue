<script setup>
import { ref } from 'vue';

import ListHeader from '~/components/ListHeader.vue'

import {
    getOrderList,
    deleteOrder,

} from '~/api/order.js';

import { useInitTable, } from '~/composables/useCommon.js';
import Search from '~/components/Search.vue';
import SearchItem from '~/components/SearchItem.vue';


// 搜索/分页 功能- 修改状态/删除

const {
    handleSelectionChange,
    handleMultiDelete,
    multipleTableRef,
    searchForm,
    resetSearchForm,
    tableData,
    loading,
    currentPage,
    total,
    limit,
    getData,
    handleDelete,

    multiSelectionIds
} = useInitTable({
    searchForm: {
        title: "",
        tab: "all",
        category_id: null,
    },
    getList: getOrderList,
    onGetListSuccess: (res) => {
        tableData.value = res.list.map(o => {
            o.bannersLoading = false
            o.contentLoading = false
            o.skusLoading = false
            return o
        })
        total.value = res.totalCount

    },
    delete: deleteOrder
})



// 订单类型
const tabbars = [{
    key: "all",
    name: "全部"
}, {
    key: "checking",
    name: "审核中"
}, {
    key: "saling",
    name: "出售中"
}, {
    key: "off",
    name: "已下架"
}, {
    key: "min_stock",
    name: "库存预警"
}, {
    key: "delete",
    name: "回收站"
},]

</script>

<template>
    <div>
        <el-tabs v-model="searchForm.tab" class="mb-4 custom-tabs" @tab-change="getData">
            <el-tab-pane :label="item.name" :name="item.key" v-for="(item, index) in tabbars"
                :key="index"></el-tab-pane>

        </el-tabs>

        <el-card shadow="never" class="border-0">
            <!-- 搜索 -->
            <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
                <SearchItem label="关键词">
                    <el-input v-model="searchForm.title" placeholder="商品名称" clearable></el-input>
                </SearchItem>

                <!-- <template #show>
                    <SearchItem label="商品分类">
                        <el-select v-model="searchForm.category_id" placeholder="请选择商品分类" clearable>
                            <el-option v-for="item in category_list" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </SearchItem>
                </template> -->

            </Search>
                        <!-- 批量删除按钮 -->
            <ListHeader layout="">

                <el-button type="danger" size="small" @click="handleMultiDelete">批量删除</el-button>

            </ListHeader>

            <el-table ref="multipleTableRef" @selection-change="handleSelectionChange" :data="tableData" stripe
                style="width: 100%" v-loading="loading">

                <el-table-column type="selection" width="55" />
                <el-table-column label="商品" width="300">
                    <template #default="{ row }">
                        <div class="flex ">
                            <!-- 左边 -->
                            <el-image class="mr-3 rounded" style="width: 50px; height: 50px" :lazy="true"
                                :src="row.cover" fit="cover"></el-image>

                            <!-- 右边 -->
                            <div class="flex-1">
                                <p>{{ row.title }}</p>
                                <div>
                                    <span class="text-rose-500">￥{{ row.min_price }}</span>
                                    <el-divider direction="vertical" />
                                    <span class="text-gray-500 text-xs">￥{{ row.min_oprice }}</span>
                                </div>

                                <p class=" text-gray-400 text-xs mb-1">分类:{{ row.category ? row.category.name : "未分类" }}
                                </p>
                                <p class=" text-gray-400 text-xs ">创建时间:{{ row.create_time }}</p>
                            </div>
                        </div>

                    </template>
                </el-table-column>

                <el-table-column label="实际销量" width="70" prop="sale_count" align="center" />



                <el-table-column label="商品状态" width="100">
                    <template #default="{ row }">
                        <el-tag :type="row.status ? 'success' : 'danger'" size="small">{{ row.status ? '上架' :
                            '仓库' }}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="审核状态" width="120" align="center" v-if="searchForm.tab != 'delete'">
                    <template #default="{ row }">
                        <div v-if="row.ischeck == 0" class="flex flex-col">
                            <el-button type="success" size="small" plain>审核通过</el-button>
                            <el-button class="mt-2 !ml-0" type="danger" size="small" plain>审核拒绝</el-button>
                        </div>
                        <span v-else>{{ row.ischeck == 1 ? '通过' : '拒绝' }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="总库存" width="90" align="center" prop="stock" />



                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <div v-if="searchForm.tab != 'delete'">

                            <el-button class="px-1" type="primary" size="small" text>商品详情</el-button>
                        </div>
                        <span v-else>暂无操作</span>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 下 ：分页 -->
            <div class="flex items-center justify-center mt-5">
                <el-pagination background layout="prev,pager,next" :total="total" :current-page="currentPage"
                    :page-size="limit" @current-change="getData" />
            </div>


   
        </el-card>


    </div>

</template>

<style>
.custom-tabs .el-tabs__item {
    background-color: transparent !important;
}
</style>