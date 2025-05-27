import {
    createRouter, //创建路由
    createWebHashHistory //访问模式
} from 'vue-router'

import Admin from "~/layouts/admin.vue";
import Index from '~/pages/index.vue';
import Login from '~/pages/login.vue';
import NotFound from '~/pages/404.vue';
import GoodList from '~/pages/goods/list.vue';
import CategoryList from '~/pages/category/list.vue';



//  路由配置
// const routes = [
//     {
//         path: "/",
//         component: Admin,
//         //子路由
//         children: [{
//             path: "/",
//             component: Index,
//             meta: {
//                 title: "后台首页"
//             }
//         },{

//             path: '/goods/list',
//             component: GoodList,
//             meta: {
//                 title: "商城管理"
//             }
//         },{

//             path: '/category/list',
//             component: CategoryList,
//             meta: {
//                 title: "分类列表"
//             }
//         }]
//     },
//     {
//         path: '/login',
//         component: Login,
//         meta: {
//             title: "登录页面"
//         }
//     },
//     {
//         path: '/:pathMatch(.*)*', //vite官网动态路由404匹配
//         name: 'NotFound',
//         component: NotFound,
//         meta: {
//             title: "404"
//         }
//     },

// ]
//默认路由，所有用户共享
const routes = [
    {
        path: "/",
        name: "admin",
        component: Admin,
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

//动态路由 用于匹配菜单，动态添加路由
const asyncRoutes = [
    {
        path: "/",
        name:"/",
        component: Index,
        meta: {
            title: "后台首页"
        }
    }, {

        path: "/goods/list",
        name:"/goods/list",
        component: GoodList,
        meta: {
            title: "商城管理"
        }
    }, {

        path: "/category/list",
        name:"/category/list",
        component: CategoryList,
        meta: {
            title: "分类列表"
        }
    }
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes

})

//动态添加路由的方法  递归菜单数据，去匹配子路由 去pemission.js中调用
export function addRoutes(menus){
    // 是否有新的路由
    let hasNewRoutes = false
    const findAddRoutesByMenus = (arr) =>{
        arr.forEach(e=> {
          let item = asyncRoutes.find(o=>o.path == e.frontpath)
        //   路径不存在，并且之前没有这个路由，就指定到父级路由下的子路由并添加
          if(item && !router.hasRoute(item.path)){
            router.addRoute("admin",item)
            hasNewRoutes = true
          }
        //   是否有子路由 有就再调用（递归）
          if(e.child && e.child.length > 0){
            findAddRoutesByMenus(e.child)
          }
        })
    }
    findAddRoutesByMenus(menus)

    return hasNewRoutes
}