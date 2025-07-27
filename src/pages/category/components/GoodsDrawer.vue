<script setup>
import { ref } from 'vue';
import { toast } from '~/composables/util'
import FormDrawer from '~/components/FormDrawer.vue';
import {
    getCategoryGoods,
    deleteCategoryGoods,
    connectCategoryGoods
} from '~/api/category.js';

import ChooseGoods from '~/components/ChooseGoods.vue';

const formDrawerRef = ref(null);
const category_id = ref(0);
const tableData = ref([]);
const open = (item) => {

    category_id.value = item.id
    item.goodsDrawerLoading = true
    getData()
        .then(res => {
            formDrawerRef.value.open()
        })
        .finally(() => {
            item.goodsDrawerLoading = false
        })

}

function getData() {
    return getCategoryGoods(category_id.value)
        .then(res => {
            // console.log(res);
            tableData.value = res.map(o=>{
                o.loading = false
                return o
            })
        })

}

const handleDelete = (row) => {
    row.loading = true
    deleteCategoryGoods(row.id).then(res=>{
        toast("删除成功")
        getData()
    })

}

const ChooseGoodsRef = ref(null)

const handleConnet = () => {
    formDrawerRef.value.showLoading()
    ChooseGoodsRef.value.open((goods_ids)=>{
        connectCategoryGoods({
            category_id:category_id.value,
            goods_ids
        })
        .then(res=>{
            getData()
            toast("关联成功")
        })
        .finally(()=>{
            formDrawerRef.value.hideLoading()
        })
        
    })
}   
defineExpose({
    open,
})

</script>
<template>
    <FormDrawer ref="formDrawerRef" consfirmText="关联" title="推荐商品" @submit="handleConnet">
        <el-table :data="tableData" border stripe style="width: 100%;">
            <el-table-column prop="goods_id" label="ID" width="60" />
            <el-table-column label="商品封面" width="180">
                <template #default="{ row }">
                    <el-image :src="row.cover" fit="fill" :lazy="true" style="width: 64px;
                    height: 64px;"></el-image>

                </template>
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="180" />


            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-popconfirm title="是否要删除该记录?" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelete(row)">
                        <template #reference>
                             <el-button type="primary" text size="small" :loading="row.loading" >删除</el-button>
                        </template>
                    </el-popconfirm>
                   
                </template>
            </el-table-column>

        </el-table>

    </FormDrawer>

    <ChooseGoods ref="ChooseGoodsRef">

    </ChooseGoods>
</template>
