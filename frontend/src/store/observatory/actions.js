// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

import * as types from './actionTypes'

const ASTRO_ENDPOINT = 'https://fits.miksoft.pro'
const API_ENDPOINT = 'https://api.miksoft.pro'

export function getRelayData() {
    return async(dispatch) => {
        try {
            const url = API_ENDPOINT + `/relay/get`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            })

            const payload = await response.json()

            dispatch({ type: types.GET_RELAY_DATA, payload })
        } catch (error) {
            console.error(error)
        }
    }
}

export function setRelayData(device, status, token) {
    return async(dispatch) => {
        try {
            const url = API_ENDPOINT + `/relay/set?device=${device}&status=${status}`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    AuthToken: token
                }
            })

            const payload = await response.json()

            dispatch({ type: types.GET_RELAY_CURRENT, payload })
        } catch (error) {
            console.error(error)
        }
    }
}


export function getSensorData() {
    return async(dispatch) => {
        try {
            const url = API_ENDPOINT + `/astro/get/summary`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            });

            const payload = await response.json()

            dispatch({ type: types.GET_SENSOR_DATA, payload })
        } catch (error) {
            console.error(error)
        }
    }
}

export function getSensorStat() {
    return async(dispatch) => {
        try {
            const url = API_ENDPOINT + `/astro/get/statistic`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            })

            const payload = await response.json()

            dispatch({ type: types.GET_SENSOR_STAT, payload })
        } catch (error) {
            console.error(error)
        }
    }
}

export function getFITStat() {
    return async(dispatch) => {
        try {
            const url = API_ENDPOINT + `/astro/get/fit_stats`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            });

            const payload = await response.json()

            dispatch({ type: types.GET_FITS_STAT, payload })
        } catch (error) {
            console.error(error)
        }
    }
}


// export function fetchData() {
//     return async(dispatch) => {
//         try {
//             const url = `${API_ENDPOINT}/get/data`
//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     Accept: 'application/json'
//                 }
//             });
//
//             const payload = await response.json()
//
//             dispatch({ type: types.GET_STAT_DATA, payload })
//         } catch (error) {
//             console.error(error)
//         }
//     }
// }

export function fetchDataByName(name = '') {
    return async(dispatch) => {
        try {
            const url = `${API_ENDPOINT}/astro/get/fit_object_stats?name=${name}`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            });

            const payload = await response.json()

            dispatch({ type: types.GET_OBJECT_DATA, payload })
        } catch (error) {
            console.error(error)
        }
    }
}

// export function fetchGraphData() {
//     return async(dispatch) => {
//         try {
//             const url = `${API_ENDPOINT}/get/graph_data`
//             const response = await fetch(url, {
//                 method: 'GET',
//                 headers: {
//                     Accept: 'application/json'
//                 }
//             })
//
//             const payload = await response.json()
//
//             dispatch({ type: types.GET_GRAPH_DATA, payload })
//         } catch (error) {
//             console.error(error)
//         }
//     }
// }