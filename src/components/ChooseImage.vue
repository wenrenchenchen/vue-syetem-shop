<script setup>
import { ref } from 'vue'

import ImageAside from '~/components/ImageAside.vue';
import ImageMain from '~/components/ImageMain.vue';



const dialogVisible = ref(false)

const open = () => dialogVisible.value = true
const close = ()=> dialogVisible.value  = false


// 图库组件
const ImageAsideRef = ref(null)

const handleOpenCreate = ()=> ImageAsideRef.value.handleCreate()

const ImageMainRef = ref(null)
const handleAsideChange = (image_class_id)=> ImageMainRef.value.loadData(image_class_id)

const handleOpenUpload = ()=> ImageMainRef.value.openUploadFile()


const props = defineProps({
    modelValue:[String,Array]
})

const emit = defineEmits(["update:modelValue"])

// 拿到选中的图片
let urls = []
const handleChoose = (e)=>{
    urls = e.map(o=>o.url)
    
}
const submit = () => {
    if(urls.length){
        emit("update:modelValue",urls[0])
    }
    close()
}

</script>
<template>
    
    <div v-if="modelValue">
        <el-image :src="modelValue" fit="cover" class="w-[100px] h-[100px] rounded border mr-2 "></el-image>
    </div>

    <div class="choose-image-btn" @click="open()">
        <el-icon :size="25" class="text-gray-500">
            <Plus />
        </el-icon>
    </div>
    <el-dialog title="选择图片" v-model="dialogVisible" width="80%" top="5vh">
            <!--  图库组件 -->
            <el-container class="bg-white rounded" style="height: 70vh;">
                <!-- A头部 -->
                <el-header class="image-header">
                    <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
                    <el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>
                </el-header>

                <el-container>
                    <!-- B侧边 -->
                    <ImageAside ref="ImageAsideRef" @change="handleAsideChange" />
                    <!-- C内容 -->
                    <ImageMain openChoose ref="ImageMainRef" @choose="handleChoose" />
                </el-container>
            </el-container>

        <span></span>
        <template #footer>
            <span>
                <el-button @click="close" >取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </span>
        </template>
    </el-dialog>

</template>
<style>
.choose-image-btn {
    width: 100px;
    height: 100px;
    @apply rounded border flex justify-center items-center cursor-pointer :hover:(bg-gray-100);
}
.image-header{
    border-bottom: 1px solid #eeeeee;
    @apply flex items-center;
}

</style>