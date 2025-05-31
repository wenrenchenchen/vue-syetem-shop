<script setup>
import { ref } from "vue"
import {
    getStatistics1,
    getStatistics2
} from "~/api/index.js"
import CountTo from "~/components/CountTo.vue"
import IndexNavs from "~/components/IndexNavs.vue"
import IndexChart from "~/components/IndexChart.vue"
import IndexCard from "~/components/IndexCard.vue"


const panels = ref([])
getStatistics1()
    .then(res => {
        panels.value = res.panels
        // console.log(panels.value);

    })

const goods = ref([])
const order = ref([])

getStatistics2().then(res=>{
    goods.value = res.goods
    order.value = res.order
})
</script>

<template>
    
    <div>
        <!-- 1统计面板 -->
        <el-row :gutter="20">
            <template v-if="panels.length == 0">
                <el-col :span="6" v-for="i in 4" :key="i">
                    <el-skeleton style="width: 100%;" animated loading>
                        <template #template>
                            <el-card shadow="hover" class="border-0">
                                <template #header>
                                    <div class="flex justify-between">
                                        <el-skeleton-item variant="text" style="width: 50%" />
                                        <el-skeleton-item variant="text" style="width: 10%" />
                                    </div>
                                </template>
                                <el-skeleton-item variant="h3" style="width: 80%" />
                                <el-divider />
                                <div class="flex justify-between text-sm  text-gray-500">
                                    <el-skeleton-item variant="text" style="width: 50%" />
                                    <el-skeleton-item variant="text" style="width: 10%" />
                                </div>
                            </el-card>
                        </template>
                    </el-skeleton>
                </el-col>
            </template>
            <el-col :span="6" :offset="0" v-for="(item, index) in panels" :key="index">
                <el-card shadow="hover" class="border-0">
                    <template #header>
                        <div class="flex justify-between">
                            <span class="text-sm">{{ item.title }}</span>
                            <el-tag :type="item.unitColor" effect="plain">
                                {{ item.unit }}
                            </el-tag>
                        </div>
                    </template>
                    <span class="text-3xl font-bold text-gray-500">
                        <!-- <CountTo :value="item.value"/> -->
                        {{ item.value }}
                    </span>
                    <el-divider />
                    <div class="flex justify-between text-sm  text-gray-500">
                        <span>{{ item.subTitle }}</span>
                        <span>{{ item.subValue }}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 2分类面板 -->
        <IndexNavs></IndexNavs>

        <!-- 3 左右布局 -->
        <el-row :gutter="20" class=" mt-5">
        <!-- 左 echart图表 -->
            <el-col :span="12" :offset="0">
                <IndexChart />
            </el-col>
            <!-- 右 -->
            <el-col :span="12" :offset="0">
                <IndexCard title="店铺及商品提示" tip="店铺及商品提示" :btns="goods" />
                <IndexCard title="交易提示" tip="需要立即处理的交易订单" :btns="order" class="mt-3"/>
            </el-col>
        </el-row>
        


    </div>
</template>

<style></style>