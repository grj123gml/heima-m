import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入字体文件图标css
import '@/assets/fonts/iconfont.css'
// 引入flexible 动态设置 REM 基准值
import 'amfe-flexible/index.min.js'

import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
