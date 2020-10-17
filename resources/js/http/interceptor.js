import axios from 'axios'
import env from '@/environments'
import {
    isLogged,
    logout
} from '@/services/authentication'
import {
    Message
} from 'element-ui'
import messages from '@/utils/messages'

const http = axios.create({
    baseURL: env.domain,
    timeout: 60000
})

http.interceptors.request.use(config => {
    const user = isLogged()
    if (user !== undefined) {
        config.headers['Authorization'] = `Bearer ${user.token}`
    }
    return config
}, error => {
    console.log(error)
    return Promise.reject(error)
})

http.interceptors.response.use(res => {
    const {
        method
    } = res.config

    if (method === 'post' && process.env.NODE_ENV !== 'production') {
        console.log(res)
    }
    return res
}, error => {
    const {
        response
    } = error

    if (response === undefined) {
        return throwError(messages.serverErrorMessage)
    }
    const user = isLogged()
    if (parseInt(response.status) === 401 && user !== undefined) {
		logout()
		window.location.href = '/#/auth/login'
    }
    throwError(error.response.data.message)
    console.log(error.response)
    return Promise.reject(error)
})

function throwError(message) {
    return Message({
        type: 'error',
        message: message,
        title: 'Erro!',
        duration: 5 * 1000
    })
}

export default http
