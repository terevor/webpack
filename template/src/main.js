{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}
{{#vuex}}
import store from './store'
{{/vuex}}
import * as filters from './filters'
import components from './components'

{{#mobile}}
import { bridge } from './plugins'
import 'lib-flexible'
import 'flex.css'
import FastClick from 'fastclick'
FastClick.attach(document.body)
Vue.use(bridge)
{{/mobile}}
import './assets/styles/index.scss'

Vue.config.productionTip = false

Object.keys(components).forEach((key) => { // 注册公共组件，组件名首字母大写后以v开头，使用时<v-xxx></v-xxx>
    const name = key.replace(/(\w)/, (v) => v.toUpperCase())
    Vue.component(`v${name}`, components[key])
})

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

// if (process.env.NODE_ENV === 'production') {
//     Vue.config.errorHandler = function(err, vm) {
//         console.log(err, window.location.href)
//     }
// }

/* eslint-disable no-new */
new Vue({
    el: '#app',
    {{#router}}
    router,
    {{/router}}
    {{#vuex}}
    store,
    {{/vuex}}
    {{#if_eq build "runtime"}}
    render: h => h(App)
    {{/if_eq}}
    {{#if_eq build "standalone"}}
    components: { App },
    template: '<App/>'
    {{/if_eq}}
})
