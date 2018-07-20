import Vue from 'vue'
import Router from 'vue-router'
import { routerMenuConfig } from './router.config.js'
Vue.use(Router)

const routes = routerMenuConfig.map(item => {
    return item;
})

routes.push({
    path: '*',
    redirect: '/'
})

const router = new Router({
    scrollBehavior () {
        return { x: 0, y: 0 }
    },
    linkActiveClass: 'active',
    routes
})
export default router