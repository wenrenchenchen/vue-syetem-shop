import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'



//nodejs的内置模块，处理路径相关的东西
import path from "path"


// https://vite.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      "~":path.resolve(__dirname,"src") //将波浪线指定到src这个目录，src的别名
    }
  },
  // vite自己配置服务器，解决跨域问题
  server:{
     proxy:{
      // 用/api代替了域名
       '/api': {
        target: 'http://ceshi13.dishait.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
     }
  },
  plugins: [
    vue(),
    WindiCSS(),
  ],
})
