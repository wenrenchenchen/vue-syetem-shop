<script setup>
import {
    initSkusCardItem
} from '~/composables/useSku.js'


const props = defineProps({
    skuCardId: [Number, String]
})
const {
    item,
    inputVisible,
    inputValue,
    InputRef,
    handleClose,
    showInput,
    handleInputConfirm
} = initSkusCardItem(props.skuCardId)


</script>

<template>

    <el-tag
      v-for="(tag,index) in item.goodsSkusCardValue"
      :key="index"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
      effect="plain"
    >
      {{ tag.text }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="w-20"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag" size="small" @click="showInput">
      + New Tag
    </el-button>
</template>