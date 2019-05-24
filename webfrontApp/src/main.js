// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import ElemetUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/index.css'
import particles from 'particles.js'
import { ajax } from './common/ajax'
import store from './store/index'
import { sync } from 'vuex-router-sync'


Vue.use(particles)
Vue.config.productionTip = false


sync(store, router)


// ajax注册到全局
Vue.prototype.$ajax = ajax


Vue.use(ElemetUi)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
