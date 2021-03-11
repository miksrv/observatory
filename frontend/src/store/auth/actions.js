import * as types from './actionTypes'

/**
 * Sends the username and password of the user, if everything is fine, the server authorizes the user
 * and returns the active token. It must be stored in the repository and used to execute requests
 * that require authorization.
 * @param login
 * @param passw
 * @returns {LOGIN}
 * @constructor
 */
export function Login(login, passw) {
    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}auth/login`
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

/**
 * Sends a request to log out the user, removes the token from storage.
 * @param token
 * @returns {function(...[*]=)}
 * @constructor
 */
export function Logout(token) {
    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}auth/logout`
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

/**
 * Sends the current token to the server, checks if it is still valid or not. If not, the token must be removed
 * from the storage, since requests with it will no longer work.
 * @param token
 * @returns {function(...[*]=)}
 * @constructor
 */
export function Check(token) {
    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}auth/check`
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