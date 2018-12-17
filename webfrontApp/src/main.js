// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElemetUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/index.css'
import axios from 'axios'
import particles from 'particles.js'


Vue.use(particles)
Vue.config.productionTip = false
Vue.prototype.$ajax = axios

// 配置全局访问主路径
// mockjsdata/2 --- 这个路径很重要，rap的项目路径
// Vue.prototype.$globalUrl = 'http://10.8.0.24:8083/mockjsdata/2'
Vue.prototype.$globalUrl = 'http://127.0.0.1:8000'
// Vue.prototype.$globalUrl = 'http://192.168.0.100:8083/mockjsdata/2'

Vue.use(ElemetUi)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
