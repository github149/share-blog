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
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.require)) {
        store.dispatch('checkLogin').then(res => {
            console.log("checkLogin________________", res)
            if (!res) {
                //没有登录直接跳转到首页
                next({
                    path: '/login',
                    query: { redirect: to.fullPath }
                })
            } else {
                next()
            }
        })
    } else {
        next()
    }
})

export default router