import * as types from './actionTypes'

/**
 * NOT USE NOW!
 * Receives an array of weather data by date from the server for generating graphs.
 * @param date
 * @returns {GET_STATISTIC_DAY}
 */
export function getStatisticDay(date) {
    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}meteo/get/statistic?date=${date}`
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

/**
 * Receives the latest weather data for all sensors.
 * @returns {GET_SUMMARY}
 */
export function getSummary() {
    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}meteo/get/summary`
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

/**
 * Receives summary weather statistics from the server for each day in the requested date range.
 * @param date_start
 * @param date_end
 * @returns {GET_ARCHIVE}
 */
export function getArchive(date_start, date_end) {
    return async(dispatch) => {
        dispatch({ type: types.CLEAR_ARCHIVE })

        try {
            const url = `${process.env.REACT_APP_API_HOST}meteo/get/archive?date_start=${date_start}&date_end=${date_end}`
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