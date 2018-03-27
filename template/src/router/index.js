import Vue from 'vue'
import Router from 'vue-router'

const _import = require(`./_import_${process.env.NODE_ENV}`).default

Vue.use(Router)

export const routes = [{
    path: '/',
    name: 'HelloWorld',
    component: _import('HelloWorld')
}]

const router = new Router({
    mode: 'history',
    base: '/{{name}}/',
    routes: routes
})

// router.beforeEach((to, from, next) => {
//     const {
//         auth = true
//     } = to.meta
//     if (auth) {
//         const isLogin = Boolean(store.state.user.token)
//         if (!isLogin) {
//             return next({
//                 path: '/login',
//                 query: {
//                     from: to.fullPath
//                 }
//             })
//         }
//     }
//     to.meta.from = from.fullPath
//     next()
// })

// router.afterEach(() => {})

export default router
