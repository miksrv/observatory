import * as types from './actionTypes'

const API_ENDPOINT = 'https://api.miksoft.pro/relay/'

export function getStatus() {
    return async(dispatch) => {
        try {
            const url = `${API_ENDPOINT}get`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            })

            const payload = await response.json()

            dispatch({ type: types.GET_STATUS, payload })
        } catch (error) {
            console.error(error)
        }
    }
}

export function setStatus(device, status, token) {
    status = (status === true ? 1 : 0)

    return async(dispatch) => {
        try {
            const url = `${API_ENDPOINT}set?device=${device}&status=${status}`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    AuthToken: token
                }
            })

            const payload = await response.json()

            dispatch({ type: types.SET_STATUS, payload })
        } catch (error) {
            console.error(error)
        }
    }
}