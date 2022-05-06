import Vue from 'vue'
import store from "../store"
console.log(store)
import VueRouter from 'vue-router'
import Create from '../views/Create'
import Detail from '../views/Detail'
import Edit from "../views/Edit"
import Index from "../views/Index"
import Login from "../views/Login"
import Register from "../views/Register"
import User from "../views/User"
import My from "../views/My"


Vue.use(VueRouter)
    //首页所有用户都可以查看

const routes = [{
        path: '/',
        redirect: '/index'
    }, {

        path: '/index',
        name: 'Index',
        component: Index
    },
    {
        path: '/create',
        name: 'Create',
        component: Create,
        meta: {
            require: true
        },
    },
    {
        path: '/detail/:blogId',
        name: 'Detail',
        component: Detail
    },
    {
        path: '/edit/:blogId',
        name: 'Edit',
        component: Edit,
        meta: {
            require: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/user/:userId',
        name: 'User',
        component: User
    },
    {
        path: "/my",
        name: "My",
        meta: {
            require: true
        },
        component: My
    }
]

const router = new VueRouter({
    routes
})
//每一次发送请求，如果有一项(创建博客，我的，删除博客)是要验证，都调用验证是否登录的接口，验证用户信息
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.require)) {
        store.dispatch('checkLogin').then(res => {
            console.log("checkLogin________________", res)
            if (!res) {
                //没有登录直接跳转到首页
                next('/login')
            } else {
                next()
            }
        })
    } else {
        next()
    }
})

export default router