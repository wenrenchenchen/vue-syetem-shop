<script setup>
import AsideList from './AsideList.vue';
import FormDrawer from './FormDrawer.vue'
import { getImageClassList,createImageClass,updateImageClass } from '~/api/image_class';
import { ref,reactive, } from 'vue';
import { toast } from "~/composables/util.js"
import { computed } from "@vue/reactivity";
import { deleteImageClass } from '../api/image_class';

//加载动画
const loading = ref(false)
const list = ref([])
const activeId = ref(0)

//分页

const currentPage = ref(1) //默认是第一页
const total = ref(0) //总条数
const limit = ref(10) //每页显示10条

// 获取数据
function getData(p = null){
    if(typeof p == "number"){
        currentPage.value = p
    }
    
    loading.value = true
    getImageClassList(currentPage.value)
    .then(res=>{
        total.value = res.totalCount
        list.value = res.list
        let item = list.value[0]
        if(item){
            activeId.value = item.id
        }
        
    })
    .finally(()=>{
        loading.value = false
    })
}
getData()

const editId = ref(0)
const drawerTitle = computed(()=>editId.value ? "修改" : "新增")
const formDrawerRef = ref(null)
const form = reactive({
    name:"",
    order:50
})


const rules = {
    name:[{

        required: true, //必填的意思
        message: '图库分类名称不能为空', //提示
        trigger: 'blur' //触发时机，失去焦点的时候
    }]
}

const formRef = ref(null)
const handleSubmit = ()=>{
    formRef.value.validate((valid)=>{
        if(!valid) return    

        formDrawerRef.value.showLoading()


        const fun = editId.value ? updateImageClass(editId.value,form) : createImageClass(form)

        // 新增成功后的步骤
        fun.then(res=>{
            // 提示
            toast(drawerTitle.value + "成功")
            // 重新加载第一页数据and 当前页（修改时）
            getData(editId.value ? currentPage.value : 1)
            // 关闭弹窗
            formDrawerRef.value.close()
        })
        .finally(()=>{
            formDrawerRef.value.hideLoading()
        })
    })
    
}

//新增
const handleCreate = ()=> {
    editId.value = 0
    form.name = ""
    form.order = 50
    formDrawerRef.value.open()
}
//编辑
const handleEdit = (row)=>{
    editId.value = row.id
    form.name = row.name
    form.order = row.order
    formDrawerRef.value.open()
    
}
//删除
const handleDelete = (id)=>{
    loading.value = true
    deleteImageClass(id)
    .then(res=>{    
        toast("删除成功")
        getData()
    })
    .finally(()=>{
        loading.value = false
    })
    
}


defineExpose({
    handleCreate
})

</script>
<template>
    <el-aside width="220px" class="image-aside" v-loading="loading">
        <!-- 上 ：内容标题 -->
        <div class="top">
            <AsideList :active="activeId == item.id" v-for="(item,index) in list" 
            :key="index" @edit="handleEdit(item)" @delete="handleDelete(item.id)">
                {{item.name}}
            </AsideList>

        </div>
        <!-- 下 ：分页 -->
        <div class="bottom">
            <el-pagination background layout="prev,next" :total="total" 
            :current-page="currentPage" :page-size="limit" @current-change="getData" />
        </div>
    </el-aside>
    <FormDrawer :title="drawerTitle" ref="formDrawerRef" @submit="handleSubmit">
        <el-form :model="form" ref="formRef" :rules="rules" 
        label-width="80px" :inline="false" >
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="or">
                 <el-input-number v-model="form.order" :min="0" :max="1000" />
            </el-form-item>
        </el-form>
        
    </FormDrawer>
</template>
<style>
.image-aside{
    border-right: 1px solid #eeeeee;
    position: relative;
}
.image-aside .top{
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}
.image-aside .bottom{
    position: absolute;
    height: 50px;
    right: 0;
    left: 0;
    bottom: 0;
    @apply flex items-center justify-center;
}

</style>