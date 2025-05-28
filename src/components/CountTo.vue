<script setup>
import { reactive,watch } from 'vue';
import gsap from 'gsap';

// 滚动的最大值
const props = defineProps({
    value:{
        type:Number,
        default:0
    }
})


const d = reactive({
    num:0
})

function AnimateToValue() {
    gsap.to(d,{
        duration:1,
        num:props.value
    })
}



AnimateToValue()

// 如果value变化了，就重新执行，这样就能实现动画
watch(()=>props.value,()=>AnimateToValue())

</script>
<template>
    {{ d.num.toFixed(0) }}
</template>