import { createApp } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


// import './style.css'
import App from './App.vue'
import router from './router'

// 引入所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 创建并挂载实例 
const app = createApp(App)

//创建和挂载完，才可use
app.use(router)


app.use(ElementPlus)


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

import 'virtual:windi.css'

app.mount('#app') //挂载到id为app的div（index里）
