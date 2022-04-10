import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import "../public/reset.css"
import 'element-ui/lib/theme-chalk/index.css';
import $blog from "./api/blog"
import $auth from "./api/auth"
import util from './util/util'
Vue.prototype.$blog = $blog
Vue.prototype.$auth = $auth
Vue.use(ElementUI);
Vue.use(util)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')