<template>
    <el-form-item label="规格设置" >
        <table class="border">
            <thead>
                <tr>
                    <th class="border" v-for="(th,thi) in tableThs" :key="thi" 
                    :width="th.width" :rowspan="th.rowspan" :colspan="th.colspan">
                        {{ th.name }}
                    </th>
                </tr>
                <tr>
                    <th class="border" v-for="(th,thi) in skuLabels" :key="thi">
                        {{ th.name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in sku_list" :key="index">
                    <td width="100" class="border text-center" v-for="(sku,skuI) in item.skus" :key="skuI">
                        {{ sku.value }}
                    </td>
                    <td class="border">
                        <el-input v-model="item.pprice" size="small" clearable type="number"></el-input>
                    </td> 
                    <td class="border">
                        <el-input v-model="item.oprice" size="small" clearable type="number"></el-input>
                    </td> 
                    <td class="border">
                        <el-input v-model="item.cprice" size="small" clearable type="number"></el-input>
                    </td> 
                    <td class="border">
                        <el-input v-model="item.stock" size="small" clearable type="number"></el-input>
                    </td> 
                    <td class="border">
                        <el-input v-model="item.volume" size="small" clearable type="number"></el-input>
                    </td> 
                    <td class="border">
                        <el-input v-model="item.weight" size="small" clearable type="number"></el-input>
                    </td> 
                    <td class="border">
                        <el-input v-model="item.code" size="small" clearable></el-input>
                    </td> 
                </tr>
            </tbody>
        </table>
    </el-form-item>
    

</template>
<script setup>
import {
    initSkuTable
} from "~/composables/useSku"

const {
    skuLabels,
    tableThs,
    sku_list
} = initSkuTable()


</script>