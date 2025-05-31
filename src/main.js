import { createApp } from 'vue'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


// import './style.css'
import App from './App.vue'
import {router} from './router'

// 引入所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 创建并挂载实例 
const app = createApp(App)

// 调用store
app.use(store)

//创建和挂载完，才可use
app.use(router)


app.use(ElementPlus)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

import 'virtual:windi.css'
import './pemission.js'
import 'nprogress/nprogress.css'

import permission from '~/directives/permission.js'
app.use(permission)

app.mount('#app') //挂载到id为app的div（index里）
