import { 
    createRouter, //创建路由
    createWebHashHistory //访问模式
}
 from 'vue-router'

import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'



//  路由配置
const routes = [
    {
        path:"/",
        component:Index
    },
    {
        path:'/login',
        component:Login
    },
    { 
        path: '/:pathMatch(.*)*', //vite官网动态路由404匹配
        name: 'NotFound', 
        component: NotFound 
    },
    
]

const router = createRouter({
    history:createWebHashHistory(),
    routes

})

// 将router暴露出去
export default router