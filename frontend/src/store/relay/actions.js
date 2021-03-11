import * as types from './actionTypes'

/**
 * Gets the status on the server about the status of all relays
 * @returns {GET_STATUS}
 */
export function getStatus() {
    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}relay/get`
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

/**
 * Changes the state of the relay. This request must be executed with the current user's authorization token.
 * @param device
 * @param status
 * @param token
 * @returns {SET_STATUS}
 */
export function setStatus(device, status, token) {
    status = (status === true ? 1 : 0)

    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}relay/set?device=${device}&status=${status}`
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