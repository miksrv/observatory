import * as types from './actionTypes'

const API_ENDPOINT = 'https://api.miksoft.pro'

export function Login(login, passw) {
    return async(dispatch) => {
        try {
            const url = `${API_ENDPOINT}/auth/login`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    login: login,
                    passw: passw
                })
            })

            const payload = await response.json()

            dispatch({ type: types.LOGIN, payload })
        } catch (error) {
            console.error(error)
        }
    }
}

export function Logout(token) {
    return async(dispatch) => {
        try {
            const url = `${API_ENDPOINT}/auth/logout`
            await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    AuthToken: token
                }
            })

            dispatch({ type: types.LOGOUT })
        } catch (error) {
            console.error(error)
        }
    }
}

export function Check(token) {
    return async(dispatch) => {
        try {
            const url = `${API_ENDPOINT}/auth/check`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    AuthToken: token
                }
            })

            const payload = await response.json()

            dispatch({ type: types.LOGIN, payload })
        } catch (error) {
            console.error(error)
        }
    }
}