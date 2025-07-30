<script setup>

import { computed } from 'vue';

const props = defineProps({
    layout:{
        type:String,
        default:"create,refresh"
    }
})

const btns = computed(()=>props.layout.split(","))

defineEmits(["create","refresh","delete","download"])
</script>
<template>
    <!-- 新增/刷新按钮 -->
    <div class="flex items-center justify-between mb-4">
        <div >
            <el-button v-if="btns.includes('create')" type="primary" size="small" @click="$emit('create')">新增</el-button>

            <!-- 删除 -->
            <el-popconfirm v-if="btns.includes('delete')" title="是否要删除选中的规格记录?" 
            confirm-button-text="确认" cancel-button-text="取消"@confirm="$emit('delete')">
                <template #reference>
                    <el-button  type="danger" size="small" >批量删除</el-button>
                </template>
            </el-popconfirm>    
            <slot />          
        </div>

        <div>
            <!-- 刷新 -->
            <el-tooltip v-if="btns.includes('refresh')" effect="dark" content="刷新数据" placement="top-start">
                <el-button text @click="$emit('refresh')">
                    <el-icon :size="15">
                        <Refresh />
                    </el-icon>
                </el-button>
            </el-tooltip>
            <!-- 导出数据 -->
            <el-tooltip v-if="btns.includes('download')" effect="dark" content="导出数据" placement="top-start">
                <el-button text @click="$emit('download')">
                    <el-icon :size="15">
                        <Download />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </div>
    </div>
</template>
