import * as types from './actionTypes'

export function getList() {
    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}photo/get/list`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                }
            })

            const payload = await response.json()

            dispatch({ type: types.GET_LIST, payload })
        } catch (error) {
            console.error(error)
        }
    }
}

export function getItem(name) {
    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}photo/get/item?name=${name}`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                }
            })

            const payload = await response.json()

            dispatch({ type: types.GET_ITEM, payload })
        } catch (error) {
            console.error(error)
        }
    }
}

export function clearItem() {
    return async(dispatch) => {
        dispatch({ type: types.CLEAR_ITEM })
    }
}