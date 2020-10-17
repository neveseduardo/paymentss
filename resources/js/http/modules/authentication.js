import axios from '@/http/interceptor'

export default {
    login: data => axios.post('/auth/login', data)
}
