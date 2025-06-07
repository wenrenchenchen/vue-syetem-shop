<script setup>
import { ref } from 'vue';

import ListHeader from '~/components/ListHeader.vue'
import FormDrawer from '~/components/FormDrawer.vue'

import {
    getRuleList,
    createRule,
    updateRule
} from '~/api/rule.js';

import {
    useInitTable,
    useInitForm
} from "~/composables/useCommon.js"
import { formMetaProps, inputTagEmits } from 'element-plus';

const option = ref([])
const defaultExpandedKeys = ref([])

const {
    loading,
    tableData,
    getData
} = useInitTable({
    getList: getRuleList,
    onGetListSuccess: (res) => {
        option.value = res.rules
        tableData.value = res.list
        defaultExpandedKeys.value = res.list.map(o => o.id)

    }
})


// 新增/修改/删除
const {
    drawerTitle,
    formDrawerRef,
    formRef,
    form,
    rules,
    handleSubmit,
    handleCreate,
    handleEdit

} = useInitForm({
    form: {
        rule_id: 0,
        menu: 0,
        name: "",
        condition: "",
        method: "GET",
        status: 1,
        order: 50,
        icon: "",
        frontpath: ""
    },
    rules: {

    },
    getData,
    update: updateRule,
    create: createRule,

})



</script>
<template>
    <el-card shadow="never" class="border-0">
        <!-- 新增/刷新按钮 -->
        <ListHeader @create="handleCreate" @refresh="getData" />

        <el-tree :data="tableData" :props="{ label: 'name', children: 'child' }" v-loading="loading" node-key="id"
            :default-expanded-keys="defaultExpandedKeys">
            <template #default="{ node, data }">
                <div class="custom-tree-node">
                    <!-- 左边 -->
                    <el-tag size="small" :type="data.menu ? 'primary' : 'inof'">{{ data.menu ? "菜单" : "权限" }}</el-tag>
                    <el-icon v-if="data.icon" :size="16" class="ml-2">
                        <component :is="data.icon" />
                    </el-icon>
                    <span>{{ data.name }}</span>

                    <!-- 右边 -->
                    <div class="ml-auto">
                        <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0" />
                        <el-button text type="primary" size="small" @click.stop="handleEdit(data)">修改</el-button>
                        <el-button text type="primary" size="small" @click="">增加</el-button>
                        <el-button text type="primary" size="small" @click="">删除</el-button>
                    </div>
                </div>
            </template>
        </el-tree>


        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="上级菜单" prop="rule_id">
                    <el-cascader v-model="form.rule_id" :options="option"
                        :props="{ value: 'id', label: 'name', children: 'child', checkStrictly: true, emitPath: false }"
                        placeholder="请选择上级菜单" />
                </el-form-item>
                <el-form-item label="菜单/规则" prop="menu">
                    <el-radio-group v-model="form.menu">
                        <el-radio :label="1" border>菜单</el-radio>
                        <el-radio :label="0" border>规则</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" style="width: 30%;" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标" prop="icon" v-if="form.menu == 1 ">
                    <el-input v-model="form.icon"></el-input>
                </el-form-item>
                <el-form-item label="前端路由" prop="frontpath" v-if="form.menu == 1 && form.rule_id > 0">
                    <el-input v-model="form.frontpath"  placeholder="前端路由"></el-input>
                </el-form-item>
                <el-form-item label="后端规则" prop="condition" v-if="form.menu == 0 "> 
                    <el-input v-model="form.condition" placeholder="后端规则"></el-input>
                </el-form-item>
                <el-form-item label="请求方式" prop="method" v-if="form.menu == 0 ">
                    <el-select v-model="form.method" placeholder="请选择请求方式" class="m-2">
                    <el-option
                        v-for="item in ['GET','POST','PUT','DELETE']"
                        :key="item"
                        :label="item"
                        :value="item"
                    />
                    </el-select>
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="form.order" :min="0" :max="1000" />
                </el-form-item>

            </el-form>
        </FormDrawer>
    </el-card>




</template>
<style>
.custom-tree-node {
    display: flex;
    flex: 1;
    align-items: center;
    font-size: 14px;
    padding-right: 8px;
}

.el-tree-node__content {
    padding: 20px 0;
}
</style>