// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

import * as types from './actionTypes'

const API_ENDPOINT = 'https://api.miksoft.pro'

export function getMeteoData() {
    return async(dispatch) => {
        try {
            const url = API_ENDPOINT + `/get/general`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            });

            const payload = await response.json()

            dispatch({ type: types.GET_METEO_DATA, payload })
        } catch (error) {
            console.error(error)
        }
    }
}

export function getMeteoStat() {
    return async(dispatch) => {
        try {
            const url = API_ENDPOINT + `/get/statistic?dataset=t1,h&period=today`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            });

            const payload = await response.json()

            dispatch({ type: types.GET_METEO_STAT, payload })
        } catch (error) {
            console.error(error)
        }
    }
}