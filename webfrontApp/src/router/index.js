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

// 路由守卫 -- 没有登陆不能使用输入路由跳转
// router.beforeEach((to, from, next) => {
//     if (to.path === '/login')
//         sessionStorage.removeItem('user');
//     let user = sessionStorage.getItem('user');
//     if (!user && to.path !== '/login') {
//         next({
//             path: '/'
//         })
//     } else {
//         next();
//     }
// })
export default router