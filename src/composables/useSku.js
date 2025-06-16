import { ref } from "vue";
import { 
    createGoodsSkusCard 
} from "~/api/goods";

// 当前商品ID
export const goodsId = ref(0)


// 规格选项列表
export const sku_card_list = ref([])


//初始化规格选项列表
export function initSkuCardList(d){
    sku_card_list.value = d.goodsSkusCard.map(item=>{
        // 用一个text做中介，来让后面name有值后 可以修改
        item.text = item.name
        item.loading = false
        item.goodsSkusCardValue.map(v=>{
            v.text = v.value || "属性值"
            return v
        })
        return item
    })
    
}

// 添加规格选项
export const btnLoading = ref(false)
export function addSkuCardEvent(){
    btnLoading.value = true
    createGoodsSkusCard({
        goods_id: goodsId.value,
        name: "规格名称",
        order: 50,
        type: 0
    })
    .then(res=>{
        sku_card_list.value.push({
            ...res,
            text:res.name,
            loading:false,
            goodsSkusCardValue:[]
        })
        
    })
    .finally(()=>{
        btnLoading.value = false
    })
}



//初始化规格值
export function initSkusCardItem(id){
    const item = sku_card_list.value.find(o=>o.id == id)
    return {
        item
    }
}