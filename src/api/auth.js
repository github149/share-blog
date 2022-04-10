import request from "../request/request"

const URL = {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    USERINFO: '/auth',
    LOGOUT: '/auth/logout'
}
export default {
    register({ username, password }) {
        return request(URL.REGISTER, 'POST', { username, password })
    },
    login({ username, password }) {
        return request(URL.LOGIN, 'POST', { username, password })
    },
    auth() {

        return request(URL.USERINFO)
    },
    logout() {
        localStorage.removeItem('token')
        return request(URL.LOGOUT)
    }
}