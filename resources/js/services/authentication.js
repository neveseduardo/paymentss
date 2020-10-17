const USER_KEY = 'USER_KEY'

export function isLogged() {
    return JSON.parse(localStorage.getItem(USER_KEY))
}

export function logout() {
    return localStorage.removeItem(USER_KEY)
}

export function login(user) {
    return localStorage.setItem(USER_KEY, JSON.stringify(user))
}
