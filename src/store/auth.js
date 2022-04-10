import auth from "../api/auth"

const state = {
    isLogin: false,
    user: null,
    loaddingCount:0,
}
const getters = {
    isLogin: state => state.isLogin,
    user: state => state.user

}
const mutations = {
    isLogin(state, data) {
        console.log("===============islogin", data.isLogin)
        state.isLogin = data.isLogin
    },
    setUser(state, data) {
        state.user = data
    }



}
const actions = {
    //actions中请求数据
    async checkLogin({ commit }) {
        let res = await auth.auth()
        console.log("created-------------", res)
        commit('isLogin', { isLogin: res.isLogin })
        if (!res.isLogin) return false
        commit('setUser', res.data)
        return true
    },
    async onLogin({ commit }, { username, password }) {
        const res = await auth.login({ username, password })
        commit('setUser', res.data)
        commit('isLogin', { isLogin: true })
        return res.data
    },
    async onRegister({ commit }, { username, password }) {
        const res = await auth.register({ username, password })
        commit('setUser', res.data)
        commit('isLogin', { isLogin: true })
        return res.data
    },
    async onLogout({ commit }) {
        const res = await auth.logout()
        console.log("logout------------------------", res)
        commit('setUser', { user: null })
        commit('isLogin', { isLogin: false })
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}