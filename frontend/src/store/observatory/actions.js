// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

import * as types from './actionTypes'

const ASTRO_ENDPOINT = 'https://fits.miksoft.pro'

export function fetchData() {
    return async(dispatch) => {
        try {
            const url = `${ASTRO_ENDPOINT}/get/data`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            });

            const payload = await response.json()

            dispatch({ type: types.GET_STAT_DATA, payload })
        } catch (error) {
            console.error(error)
        }
    }
}
export function fetchGraphData() {
    return async(dispatch) => {
        try {
            const url = `${ASTRO_ENDPOINT}/get/graph_data`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            });

            const payload = await response.json()

            dispatch({ type: types.GET_GRAPH_DATA, payload })
        } catch (error) {
            console.error(error)
        }
    }
}