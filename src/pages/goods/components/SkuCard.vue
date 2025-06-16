<script setup>
import SkuCardItem from './SkuCardItem.vue';
import {
    sku_card_list,
    addSkuCardEvent,
    btnLoading
}from '~/composables/useSku.js'

</script>
<template>
    <el-form-item label="规格选项" >
        <el-card shadow="never" class="w-full mb-3" v-for="(item,index) in sku_card_list" :key="item.id">
            <!-- 头 -->
            <template #header>
            <div class="flex items-center">
                <!-- 左边 -->
                <el-input v-model="item.text" placeholder="规格名称" style="width: 200px;">
                    <template #append>
                        <el-icon>
                            <more />
                        </el-icon>
                    </template>
                </el-input>
                <!-- 右边 -->
                 <el-button class="ml-auto"  size="small" @click=""><el-icon><Top /></el-icon></el-button>
                 <el-button  size="small" @click=""><el-icon><Bottom /></el-icon></el-button>
                 <el-button  size="small" @click=""><el-icon><Delete /></el-icon></el-button>
                 
            </div>
            </template>
            
            <!-- 内容 -->
            <SkuCardItem :skuCardId="item.id" />
        </el-card>
        <el-button :loading="btnLoading" type="success" size="small" @click="addSkuCardEvent">添加规格</el-button>
        
    </el-form-item>
</template>
<style>
.el-card__header {
    @apply !p-2 bg-gray-50;
}
</style>