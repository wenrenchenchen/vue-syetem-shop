<script setup>
import { ref,onMounted,onBeforeUnmount  } from 'vue' 
import * as echarts from 'echarts';
import { useResizeObserver } from '@vueuse/core'
import {
    getStatistics3
} from '~/api/index.js'

// 用current记录当前选中的value
const current = ref("week")
const options = [{
    text:"近1个月",
    value:"month"
},{
    text:"近1周",
    value:"week"
},{
    text:"近24小时",
    value:"hour"
}
]

const handleChoose = (type)=>{
    current.value = type
    getData()
}

var myChart = null
onMounted(()=>{
    var chartDom = document.getElementById('chart');
    if(chartDom){
        myChart = echarts.init(chartDom);
        getData()
    }

})


onBeforeUnmount(()=>{
    if(myChart) echarts.dispose(myChart)
})

function getData(){
    var option;

    option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
        }
    ]
    };

    myChart.showLoading()
    getStatistics3(current.value).then(res=>{
        option.xAxis.data = res.x
        option.series[0].data = res.y

        myChart.setOption(option)
    }).finally(()=>{
        myChart.hideLoading()
    })
}

const el = ref(null)

useResizeObserver(el, (entries) => {
  myChart.resize()
})

</script>

<template>
    <!-- 外层卡片 -->
    <el-card shadow="never">
        <template #header>
        <div class="flex justify-between">
            <span class="text-sm">订单统计</span>
            <div>
                <el-check-tag v-for="(item,index) in options" :key="index" style="margin-right: 8px;" 
                :checked="current == item.value" @click="handleChoose(item.value)">
                    {{ item.text }}
                </el-check-tag>
            </div>
        </div>
        </template>
        <!-- 图表 -->
        <div ref="el" id="chart" style="width: 100%; height: 300px;"></div>

    </el-card>

</template>

<style>

</style>