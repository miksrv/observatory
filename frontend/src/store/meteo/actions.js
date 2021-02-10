// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

import * as types from './actionTypes'

const API_ENDPOINT = 'https://api.miksoft.pro/meteo/get/'

export function getStatisticDay(date) {
    return async(dispatch) => {
        try {
            const url = API_ENDPOINT + `statistic?date=${date}`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            });

            const payload = await response.json()

            dispatch({ type: types.GET_STATISTIC_DAY, payload })
        } catch (error) {
            console.error(error)
        }
    }
}

export function getSummary() {
    return async(dispatch) => {
        try {
            const url = API_ENDPOINT + `summary`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            })

            const payload = await response.json()

            dispatch({ type: types.GET_SUMMARY, payload })
        } catch (error) {
            console.error(error)
        }
    }
}

export function getArchive(date_start, date_end) {
    return async(dispatch) => {
        dispatch({ type: types.CLEAR_ARCHIVE })

        try {
            const url = API_ENDPOINT + `archive?date_start=${date_start}&date_end=${date_end}`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            })

            const payload = await response.json()

            dispatch({ type: types.GET_ARCHIVE, payload })
        } catch (error) {
            console.error(error)
        }
    }
}