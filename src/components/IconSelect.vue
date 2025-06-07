<script setup>
import { ref } from 'vue';
import * as iconList from '@element-plus/icons-vue'

defineProps({
    modelValue:String
})


const icons = ref(Object.keys(iconList))
const emit = defineEmits("update:modelValue")
const handleChange = (icon)=>{
    emit("update:modelValue",icon)
}

</script>
<template>
    <div class="flex items-center">
        <el-icon :size="20" class="mr-2" v-if="modelValue">
            <component :is="modelValue" />
        </el-icon>
        <el-select filterable :modelValue="modelValue" placeholder="请选择图标" class="m-2" 
        @change="handleChange" style="width: 150px;" >
            <el-option
                v-for="item in icons"
                :key="item"
                :label="item"
                :value="item">
                <div class="felx items-center justify-between" >
                    <el-icon>
                        <component :is="item" />
                    </el-icon>
                    <span class="text-gray-500 pl-2"> {{ item }}</span>
                </div>
            </el-option>
        </el-select>
    </div>
</template>
<style>

</style>