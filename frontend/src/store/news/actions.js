import * as types from './actionTypes'

export function getNews(offset, limit) {
    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}vk/get/wall?offset=${offset}&limit=${limit}`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                }
            })

            const payload = await response.json()

            dispatch({ type: types.GET_DATA, payload })
        } catch (error) {
            console.error(error)
        }
    }
}