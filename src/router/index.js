import {
    createRouter, //创建路由
    createWebHashHistory //访问模式
} from 'vue-router'

import Admin from "~/layouts/admin.vue";
import Index from '~/pages/index.vue';
import Login from '~/pages/login.vue';
import NotFound from '~/pages/404.vue';



//  路由配置
const routes = [
    {
        path: "/",
        component: Admin,
        //子路由
        children: [{
            path: "/",
            component: Index,
            meta: {
                title: "后台首页"
            }
        }]
    },
    {
        path: '/login',
        component: Login,
        meta: {
            title: "登录页面"
        }
    },
    {
        path: '/:pathMatch(.*)*', //vite官网动态路由404匹配
        name: 'NotFound',
        component: NotFound,
        meta: {
            title: "404"
        }
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes

})

// 将router暴露出去
export default router