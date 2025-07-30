import axios from '~/axios'

import { queryParams } from '~/composables/util'


export function getOrderList(page, query = {}) {
    const r = queryParams(query)
    return axios.get(`/admin/order/${page}${r}`)
}
export function deleteOrder(ids){
    return axios.post(`/admin/order/delete_all`,{
        ids
    })
}