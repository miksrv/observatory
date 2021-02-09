import * as types from './actionTypes'

const API_ENDPOINT = 'https://api.miksoft.pro'

export function getStatisticDay(date) {
    return async(dispatch) => {
        try {
            const url = API_ENDPOINT + `/astro/get/statistic?date=${date}`
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

export function getEventCalendarFIT(date = '') {
    return async(dispatch) => {
        try {
            const url = API_ENDPOINT + `/astro/get/month_stats` + (date && `?date=${date}`)
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            });

            const payload = await response.json()

            dispatch({ type: types.GET_FITS_EVENT, payload })
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