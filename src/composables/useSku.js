import { id } from "element-plus/es/locales.mjs";
import { ref } from "vue";
import {
    createGoodsSkusCard,
    updateGoodsSkusCard,
    deleteGoodsSkusCard,
    sortGoodsSkusCard
} from "~/api/goods";
import {
    useArrayMoveUp,
    useArrayMoveDown
} from "~/composables/util"

// 当前商品ID
export const goodsId = ref(0)


// 规格选项列表
export const sku_card_list = ref([])


//初始化规格选项列表
export function initSkuCardList(d) {
    sku_card_list.value = d.goodsSkusCard.map(item => {
        // 用一个text做中介，来让后面name有值后 可以修改
        item.text = item.name
        item.loading = false
        item.goodsSkusCardValue.map(v => {
            v.text = v.value || "属性值"
            return v
        })
        return item
    })

}

// 添加规格选项
export const btnLoading = ref(false)
export function addSkuCardEvent() {
    btnLoading.value = true
    createGoodsSkusCard({
        goods_id: goodsId.value,
        name: "规格名称",
        order: 50,
        type: 0
    })
        .then(res => {
            sku_card_list.value.push({
                ...res,
                text: res.name,
                loading: false,
                goodsSkusCardValue: []
            })

        })
        .finally(() => {
            btnLoading.value = false
        })
}

//修改规格选项
export function handleUpdate(item) {
    item.loading = true
    updateGoodsSkusCard(item.id, {
        "goods_id": item.goods_id,
        "name": item.text,
        "order": item.order,
        "type": 0
    })
        .then(res => {
            item.name = item.text
        })
        .catch(err => {
            item.text = item.name
        })
        .finally(() => {
            item.loading = false
        })

}
//删除规格选项
export function handleDelete(item) {
    item.loading = true
    deleteGoodsSkusCard(item.id)
        .then(res => {
            const i = sku_card_list.value.findIndex(o => o.id == item.id)
            if (i != -1) {
                sku_card_list.value.splice(i, 1)
            }
        })

}

// 排序规格选项 上移和下移
export const bodyLoading = ref(false)
export function sortCard(action, index) {

    let oList = JSON.parse(JSON.stringify(sku_card_list.value))
    let func = action == "up" ? useArrayMoveUp : useArrayMoveDown
    func(oList, index)
    // if(action == "up"){
    //     useArrayMoveUp(oList,index)
    // }
    // if(action == "down"){
    //     useArrayMoveDown(oList,index)
    // }
    let sortData = oList.map((o, i) => {
        return {
            id: o.id,
            order: i + 1
        }
    })
    // console.log(sortData);
    bodyLoading.value = true
    sortGoodsSkusCard({
        sortdata: sortData
    })
        .then(res => {
            func(sku_card_list.value, index)
        })
        .finally(() => {
            bodyLoading.value = false
        })
}


//初始化规格值
export function initSkusCardItem(id) {
    const item = sku_card_list.value.find(o => o.id == id)

    const inputValue = ref('')
    const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
    const inputVisible = ref(false)
    const InputRef = ref()

    const handleClose = (tag) => {
        dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
    }

    const showInput = () => {
        inputVisible.value = true
        nextTick(() => {
            InputRef.value.input.focus()
        })
    }

    const handleInputConfirm = () => {
        if (inputValue.value) {
            dynamicTags.value.push(inputValue.value)
        }
        inputVisible.value = false
        inputValue.value = ''
    }

    return {
        item,
        inputVisible,
        inputValue,
        InputRef,
        handleClose,
        showInput,
        handleInputConfirm

    }
}