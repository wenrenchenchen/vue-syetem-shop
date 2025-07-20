<script setup>
import SkuCardItem from './SkuCardItem.vue';
import ChooseSku from '~/components/ChooseSku.vue'
import {
    sku_card_list,
    addSkuCardEvent,
    btnLoading,
    handleUpdate,
    handleDelete,
    sortCard,
    bodyLoading,
    handleChooseSetGoodsSkusCard
}from '~/composables/useSku.js'

import {ref} from "vue"
const ChooseSkuRef = ref(null)
const handleChooseSku = (item)=>{
    ChooseSkuRef.value.open((value)=>{
       handleChooseSetGoodsSkusCard(item.id,{
        name:value.name,
        value:value.list
       })
        
    })
}

</script>
<template>
    <el-form-item label="规格选项" v-loading = "bodyLoading">
        <el-card shadow="never" class="w-full mb-3" v-for="(item,index) in sku_card_list" :key="item.id" :loading="item.loading">
            <!-- 头 -->
            <template #header>
            <div class="flex items-center">
                <!-- 左边 -->
                <el-input v-model="item.text" placeholder="规格名称" style="width: 200px;"  @change="handleUpdate(item)">
                    <template #append>
                        <el-icon class="cursor-pointer" @click="handleChooseSku(item)">
                            <more />
                        </el-icon>
                    </template>
                </el-input>
                <!-- 右边 -->
                 <el-button class="ml-auto"  size="small" @click="sortCard('up',index)" :disabled="index == 0"><el-icon><Top /></el-icon></el-button>
                 <el-button  size="small" @click="sortCard('down',index)" :disabled="index === sku_card_list.length - 1"><el-icon><Bottom /></el-icon></el-button>
                 <el-popconfirm title="是否要删除该选项？" confirm-button-text="确认" cancel-button-text="取消"
                    @confirm="handleDelete(item)">
                    <template #reference>
                        <el-button  size="small" @click=""><el-icon><Delete /></el-icon></el-button>
                    </template>
                 </el-popconfirm>
                 
                 
            </div>
            </template>
            
            <!-- 内容 -->
            <SkuCardItem :skuCardId="item.id" />
        </el-card>
        <el-button :loading="btnLoading" type="success" size="small" @click="addSkuCardEvent">添加规格</el-button>
        
    </el-form-item>

    <ChooseSku ref="ChooseSkuRef"/>
</template>
<style>
.el-card__header {
    @apply !p-2 bg-gray-50;
}
</style>