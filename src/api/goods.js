import axios from '~/axios'

import { queryParams } from '~/composables/util'


export function getGoodsList(page, query = {}) {
    const r = queryParams(query)
    return axios.get(`/admin/goods/${page}${r}`)
}
// 批量上架，下架
export function updateGoodsStatus(ids, status) {
    return axios.post(`/admin/goods/changestatus`, {
        ids,
        status

    })
}

export function createGoods(data){
    return axios.post("/admin/goods" ,data)
}
export function updateGoods(id,data){
    return axios.post(`admin/goods/${id}`,data)
}
export function deleteGoods(ids){
    return axios.post(`/admin/goods/delete_all`,{
        ids
    })
}

export function readGoods(id){
    return axios.get(`/admin/goods/read/${id}`)
}
export function setGoodsBanner(id,data){
    return axios.post(`/admin/goods/banners/${id}`,data)
}

export function updateGoodsSkus(id,data){
    return axios.post(`/admin/goods/updateskus/${id}`,data)
}

export function createGoodsSkusCard(data){
    return axios.post("/admin/goods_skus_card",data)
}
