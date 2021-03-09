import * as types from './actionTypes'

const API_ENDPOINT = 'https://api.miksoft.pro/astro/get/'

export function getObjectStats(date) {
    return async(dispatch) => {
        try {
            const url = API_ENDPOINT + `day_object_stats?date=${date}`
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
            const url = API_ENDPOINT + `summary`
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
            const url = API_ENDPOINT + `statistic`
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
            const url = API_ENDPOINT + `fit_stats`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            })

            const payload = await response.json()

            dispatch({ type: types.GET_FITS_STAT, payload })
        } catch (error) {
            console.error(error)
        }
    }
}

export function getArchive(date_start, date_end) {
    return async(dispatch) => {
        try {
            // const url = API_ENDPOINT + `archive?date_start=${date_start}&date_end=${date_end}`
            const url = API_ENDPOINT + `archive?date=${date_start}`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            })

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
            const url = `${API_ENDPOINT}fit_object_stats?name=${name}`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            })

            const payload = await response.json()

            dispatch({ type: types.GET_OBJECT_DATA, payload })
        } catch (error) {
            console.error(error)
        }
    }
}

export function clearDataByName() {
    return async(dispatch) => {
        dispatch({ type: types.CLEAR_OBJECT_DATA })
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