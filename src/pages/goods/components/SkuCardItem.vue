<script setup>
import {
    initSkusCardItem
} from '~/composables/useSku.js'


const props = defineProps({
    skuCardId: [Number, String]
})
const {
    item
} = initSkusCardItem(props.skuCardId)
</script>

<template>
    <div v-for="(tag,index) in item.goodsSkusCardValue" :key="tag.id">
        {{ tag.text }}
    </div>
</template>