## 前言
**Vue System Shop**项目致力于打造一个完整的后台管理系统，采用现阶段流行技术实现。

---

## 项目介绍
**vue-system-shop** 是一个商城后台管理系统的前端项目，基于 **Vue 3** + **Element Plus** 实现，采用响应式布局方式。  
主要包含以下功能模块：
- 后台面板
- 商品管理
- 用户管理
- 订单管理
- 管理员管理
- 系统设置
- 分销模块
- 统计报表


---

## 项目演示

演示地址：[https://example-demo.com](https://example-demo.com)


---

![项目展示](./public/项目展示.png)

## 技术选型

| 技术                  | 说明                                      | 官网 |
| --------------------- | ----------------------------------------- | ---- |
| Vue.js                | 前端框架，版本号为 3.2.47                 | [https://v3.vuejs.org/](https://v3.vuejs.org/) |
| Vue Router            | 路由管理器，版本号为 4.2.1                | [https://router.vuejs.org/](https://router.vuejs.org/) |
| Vuex                  | 全局状态管理库，版本号为 4.0.2            | [https://vuex.vuejs.org/](https://vuex.vuejs.org/) |
| Element Plus          | 前端 UI 框架，版本号为 2.3.4              | [https://element-plus.org/](https://element-plus.org/) |
| Axios                 | 基于 Promise 的 HTTP 客户端，版本号为 1.4.0| [https://axios-http.com/](https://axios-http.com/) |
| ECharts               | 数据可视化的 JS 图表库，版本号为 5.4.2    | [https://echarts.apache.org/en/index.html](https://echarts.apache.org/en/index.html) |
| GSAP                  | 高性能 JS 动画库，版本号为 3.11.5         | [https://greensock.com/gsap/](https://greensock.com/gsap/) |
| TinyMCE               | 富文本编辑器，版本号为 6.4.2              | [https://www.tiny.cloud/](https://www.tiny.cloud/) |
| Universal Cookie      | 处理浏览器 cookie 的 JS 库，版本号为 4.0.4| [https://www.npmjs.com/package/universal-cookie](https://www.npmjs.com/package/universal-cookie) |
| NProgress             | 轻量级进度条库，版本号为 0.2.0            | [https://ricostacruz.com/nprogress/](https://ricostacruz.com/nprogress/) |
| VueUse/Core           | 集成多个 Vue.js 实用工具库，版本号为 10.1.2| [https://vueuse.org/core/](https://vueuse.org/core/) |
| VueUse/Integrations   | 包含多个 Vue.js 集成插件库，版本号为 10.1.2| [https://vueuse.org/integrations/](https://vueuse.org/integrations/) |
| Windicss              | CSS 框架，版本号为 4.3.2                  | [https://cn.windicss.org/](https://cn.windicss.org/) |



---

## 插件

| 插件                     | 说明                                             | 官网 |
|--------------------------|------------------------------------------------|------|
| Vite                     | 一个快速的构建工具和开发服务器，版本号 6.3.5          | [官网](https://vitejs.dev/) |
| @vitejs/plugin-vue       | Vite 插件，用于支持 Vue.js 单文件组件，版本号 5.2.3   | [官网](https://cn.vitejs.dev/plugins/) |
| vite-plugin-windicss     | WindiCSS 集成插件，版本号 1.9.4                   | [官网](https://www.viterc.cn/en/vite-plugin-windicss.html) |
| Windicss                 | CSS 框架，版本号 3.5.6                             | [官网](https://cn.windicss.org/) |
| @vueuse/core             | 集成多个 Vue.js 的实用工具库，版本号 13.2.0          | [官网](https://vueuse.org/core/) |
| @vueuse/integrations     | 包含多个 Vue.js 集成插件库，版本号 13.1.0            | [官网](https://vueuse.org/integrations/) |
| @tinymce/tinymce-vue     | TinyMCE 的 Vue 集成版本，版本号 6.2.0               | [官网](https://www.tiny.cloud/) |
| tinymce                  | 富文本编辑器，版本号 7.9.1                           | [官网](https://www.tiny.cloud/) |
| nprogress                | 轻量级的进度条库，版本号 0.2.0                       | [官网](https://ricostacruz.com/nprogress/) |
| universal-cookie         | 处理浏览器 cookie 的JS库，版本号 7.2.2               | [官网](https://www.npmjs.com/package/universal-cookie) |
| gsap                     | 高性能的JS动画库，版本号 3.13.0                       | [官网](https://greensock.com/gsap/) |
| echarts                  | 数据可视化的JS图表库，版本号 5.6.0                    | [官网](https://echarts.apache.org/en/index.html) |


---

## 项目布局
.vscode -- Visual Studio Code编辑器的配置文件
├── extensions.json -- 全局配置对象
public -- 根目录的静态文件
├── tinymce -- 富文本编辑器的 TinyMCE 库或插件文件
├── alipay.png -- 支付宝的图片图标，用于在应用程序中显示支付宝支付相关的信息
├── vite.svg -- Vite.js 的 SVG 图标或标志，用于在应用程序中显示 Vite.js 相关的信息
├── wepay.png -- 微信支付的图片图标，用于在应用程序中显示微信支付相关的信息
src -- Vue.js应用程序的源代码
├── App.vue -- 应用程序的根组件，定义了应用程序的整体结构和行为
├── axios.js -- 与后端 API 进行通信的 Axios 实例
├── main.js -- 应用程序的入口点，负责初始化 Vue 实例并将其挂载到 DOM 上
├── permission.js -- 授权和身份验证的逻辑
├── api -- 所有与后端 API 进行通信的代码
├── assets -- 静态资源，例如图像、字体和样式表
├── components -- 通用组件封装
├── composables -- 工具函数封装
├── directives -- 权限配置
├── layout -- 布局组件
├── router -- vue-router路由配置
├── store -- vuex的状态管理
└── pages -- 前端页面
    ├── index.vue -- 首页
    ├── login.vue -- 登录页
    ├── 404.vue -- 404报错页
    ├── access -- 权限管理
    ├── category -- 分类管理
    ├── comment -- 评论管理
    ├── coupon -- 优惠券管理
    ├── distribution -- 分销模块
    ├── goods -- 商品管理
    ├── image -- 图库管理
    ├── level -- 会员等级
    ├── manager -- 管理员管理
    ├──notice -- 公告管理
    ├── order -- 订单管理
    ├── role -- 角色管理
    ├── setting -- 系统设置
    ├── skus -- 规格管理
    └── user -- 用户管理
.env.development -- 开发环境的环境变量
.env.production -- 生产环境的环境变量
.gitignore -- Git控制系统忽略的文件和目录列表
index.html -- 整个 Vue.js 应用程序的 HTML 模板
package-lock.json -- 自动生成的，用于确保每个开发人员在安装依赖时使用相同的版本
package.json -- 应用程序所需的所有依赖项和脚本
vite.config.js -- 配置文件