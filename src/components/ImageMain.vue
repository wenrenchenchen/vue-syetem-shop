<script setup>
import { 
    getImageList,
    updateImage,
    deletImage
} from '~/api/image';
import { ref,computed } from 'vue';
import { 
    showPrompt,
    toast 
} from '~/composables/util.js';
import  UploadFile  from "./UploadFile.vue";
//分页
const currentPage = ref(1) //默认是第一页
const total = ref(0) //总条数
const limit = ref(10) //每页显示10条
const list = ref([])
const loading = ref(false)

const image_class_id = ref(0)

//上传图片
const drawer = ref(false)
const openUploadFile = ()=>drawer.value = true

// 获取数据
function getData(p = null){
    if(typeof p == "number"){
        currentPage.value = p
    }
    
    loading.value = true
    getImageList(image_class_id.value,currentPage.value)
    .then(res=>{
        total.value = res.totalCount
        list.value = res.list.map(o=>{
            o.checked =false
            return o
        })
    })
    .finally(()=>{
        loading.value = false
    })
}

// 根据分类id重新加载图片列表 
const loadData = (id)=>{
    currentPage.value = 1
    image_class_id.value = id
    getData()
}

//重命名
const handleEdit = (item)=>{
    showPrompt("重命名",item.name)
    .then(({value})=>{

        loading.value = true
        updateImage(item.id,value)
        .then(res=>{
            toast("修改成功")
            getData()
        }) 
        .finally(()=>{
            loading.value = false
        })

    })

}
//删除图片
const handleDelete = (id)=>{
    loading.value = true
    deletImage([id])
    .then(res=>{
        toast("删除成功")
        getData()
    })
    .finally(()=>{
        loading.value = false
    })
}
// 上传成功
const handleUploadSuccess =()=> getData(1)


// 当openChoose为true时候才显示选择框
const props = defineProps({
    openChoose:{
        type:Boolean,
        default:false
    },
    limit:{
        type:Number,
        default:1
    }
})


//选中的图片
const emit = defineEmits(["choose"]) //选中图片通知父组件
const checkedImage = computed(()=> list.value.filter(o=>o.checked))
const handleChooseChange = (item)=>{
    // 选择的图片数量大于1 的时候，
    if(item.checked && checkedImage.value.length > props.limit){
        item.checked = false
        return toast(`最多只能选择${props.limit}张`,"error")
    }
    emit("choose",checkedImage.value) //数量为1时，将选中的图片传回父组件
}

//将方法传到父组件
defineExpose({
    loadData,
    openUploadFile
})




</script>
<template>
    <el-main class="image-main" v-loading="loading">
        <!-- 上 ：内容标题 -->
        <div class="top p-3" >
            <!-- <div >{{ item.url }}</div> -->
             <el-row :gutter="10">
                <el-col :span="6" :offset="0" v-for="(item,index) in list" :key="index">
                    <el-card shadow="hover" class="relative mb-3" :body-style="{'padding':0}" :class="{' border-blue-500':item.checked}" >
                        <el-image :src="item.url" fit="cover" class="w-full h-[150px]" style="width: 100%;" 
                        :preview-src-list="[item.url]" :initial-index="0"> </el-image>
                        <div class="image-title">{{ item.name }}</div>
                        <div class="flex items-center justify-center p-2">


                            <el-checkbox v-if="openChoose" v-model="item.checked" @change="handleChooseChange(item)" />
                            

                            <el-button type="primary" size="small" text @click="handleEdit(item)">重命名</el-button>
                            <el-popconfirm title="是否删除该图片" confirm-button-text="确认" cancel-button-text="取消" @confirm="handleDelete(item.id)">
                                <template #reference>
                                    <el-button type="primary" size="small" class="!m-0" text >删除</el-button>
                                </template>
                            </el-popconfirm>
                        </div>
                    </el-card>
                </el-col>
             </el-row>
             
        </div>
        <!-- 下 ：分页 -->
        <div class="bottom">
            <el-pagination 
            background 
            layout="prev,pager,next" 
            :total="total" 
            :current-page="currentPage" 
            :page-size="limit" 
            @current-change="getData" />
        </div>  
    </el-main>

    <!-- 上传 -->
    <el-drawer v-model="drawer" title="上传图片">
         <UploadFile :data="{image_class_id}" @success="handleUploadSuccess" />
    </el-drawer>


</template>
<style>
.image-main {
    position: relative;
}
.image-main .top{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 10px;
    overflow-y: auto;
}
.image-main .bottom{
    position: absolute;
    height: 50px;
    right: 0;
    left: 0;
    bottom: 0;
    @apply flex items-center justify-center;
}
.image-title{
    position: absolute;
    top: 120px;
    left: -1px;
    right: -1px;
    @apply text-sm truncate text-gray-100 bg-opacity-25 bg-gray-800 px-2 py-1.3;
}
</style>