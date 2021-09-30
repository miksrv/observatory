import * as types from './actionTypes'

export function getList() {
    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}photo/get/list_new`
            const response = await fetch(url, {
                method: 'GET',
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

export function getItem(name, date = null) {
    return async(dispatch) => {
        try {
            const param = (date ? `&date=${date}` : '')
            const url   = `${process.env.REACT_APP_API_HOST}photo/get/item_new?name=${name}${param}`
            const response = await fetch(url, {
                method: 'GET',
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