<script setup>
import { reactive, ref } from 'vue';
import FormDrawer from '~/components/FormDrawer.vue'
import { getNoticeList,createNotice } from '~/api/notice';
import {toast} from '~/composables/util'

const tableData = ref([])

//加载动画
const loading = ref(false)

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
    getNoticeList(currentPage.value)
    .then(res=>{
        // console.log(res);
        
        tableData.value = res.list
        total.value = res.totalCount
    })
    .finally(()=>{
        loading.value = false
    })
}


getData()

// 删除
const handleDelere = (id) =>{

}

// 表单部分
const formDrawerRef = ref(null)
const formRef = ref(null)
const form = reactive({
    title:"",
    content:""
})
const rules = {
    title:[{
        required: true, //必填的意思
        message: '公告名称不能为空', //提示
        trigger: 'blur' //触发时机，失去焦点的时候
    }],
    content:[{
        required: true, 
        message: '公告内容不能为空', 
        trigger: 'blur' 
    }]
}

const handleSubmit =()=>{
    formRef.value.validate((valid)=>{
        if(!valid) return

        formDrawerRef.value.showLoading()

        createNotice(form)
        .then(res=>{
            // console.log(form);
            
            toast("新增成功")
            getData(1)
            formDrawerRef.value.close()
        })
        .finally(()=>{
            formDrawerRef.value.hideLoading()
        })
    })
}
// 新增
const handleCreate = ()=>{
    formDrawerRef.value.open()
}


</script>

<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增/刷新按钮 -->
        <div class="flex items-center justify-between mb-4">
            <el-button type="primary" size="small" @click="handleCreate">新增</el-button>
            <el-tooltip effect="dark" content="刷新数据" placement="top-start">
                <el-button text @click="getData">
                    <el-icon :size="20">
                        <Refresh />
                    </el-icon>
                </el-button>
            </el-tooltip>
        </div>
        <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="title" label="公告标题" />
            <el-table-column prop="create_time" label="Name" width="380" />
            <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                    <el-button type="primary" size="small" text>修改</el-button>
                    <el-popconfirm title="是否要删除该公告" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelere(scope.row.id)">
                        <template #reference>
                            <el-button class="px-1" text type="primary" size="small">
                                删除
                            </el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- 下 ：分页 -->
        <div class="flex items-center justify-center mt-5">
            <el-pagination 
            background 
            layout="prev,pager,next" 
            :total="total" 
            :current-page="currentPage" 
            :page-size="limit" 
            @current-change="getData" />
        </div>

        
        <FormDrawer ref="formDrawerRef" title="新增" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" 
            :inline="false" >
                <el-form-item label="公告标题" prop="title">
                    <el-input v-model="form.title" placeholder="公告标题"></el-input>
                </el-form-item>
                <el-form-item label="公告内容" prop="content">
                    <el-input v-model="form.content" placeholder="公告内容" type="textarea" :rows="5"></el-input>
                </el-form-item>
            </el-form>
        </FormDrawer>
    </el-card>

</template>

<style></style>