import * as types from './actionTypes'

/**
 * Returns the current data on the observatory sensors (temperature, humidity, voltage, etc.).
 * @returns {GET_SENSOR_DATA}
 */
export function getSensorData() {
    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}astro/get/summary`
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

/**
 * Returns statistical data for generating graphs by observatory sensors (temperature, humidity, voltage, etc.).
 * @returns {GET_SENSOR_STAT}
 */
export function getSensorStat() {
    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}astro/get/statistic`
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

/**
 * Returns statistics for each captured object (for each filter and in total), as well as general
 * summary data - exposure time, number of frames, file size.
 * @returns {GET_FITS_STAT}
 */
export function getFITStat() {
    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}astro/get/fit_stats`
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

/**
 * Returns an array of survey data for objects, grouped by day. Each day contains the total exposure
 * and the number of frames.
 * @param date_start
 * @param date_end
 * @returns {GET_FITS_EVENT}
 */
export function getArchive(date_start, date_end) {
    return async(dispatch) => {
        try {
            // const url = API_ENDPOINT + `archive?date_start=${date_start}&date_end=${date_end}`
            const url = `${process.env.REACT_APP_API_HOST}astro/get/archive?date=${date_start}`
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

/**
 * Returns statistics for captured frames for the specified date (total exposure, number and list of files, etc.).
 * @param date
 * @returns {GET_STATISTIC_DAY}
 */
export function getObjectStats(date) {
    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}astro/get/day_object_stats?date=${date}`
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
 * Returns statistics for captured frames for the specified name (total exposure, number and list of files, etc.).
 * @param name
 * @returns {GET_OBJECT_DATA}
 */
export function fetchDataByName(name = '') {
    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}astro/get/fit_object_stats?name=${name}`
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

/**
 * Clears object statistics data from storage, retrieved by its name (GET_OBJECT_DATA).
 * @returns {CLEAR_OBJECT_DATA}
 */
export function clearDataByName() {
    return async(dispatch) => {
        dispatch({ type: types.CLEAR_OBJECT_DATA })
    }
}

/**
 * Sends a request to delete a file from the database by its ID and removes it from the array of
 * storage objects (GET_OBJECT_DATA).
 * @param itemID
 * @param token
 * @returns {DELETE_OBJECT_DATA}
 */
export function deleteObjectDataByID(itemID, token) {
    return async(dispatch) => {
        try {
            const url = `${process.env.REACT_APP_API_HOST}astro/delete/fit?id=${itemID}`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    AuthToken: token
                }
            })

            const payload = await response.json()

            if (payload.status === true) {
                dispatch({ type: types.DELETE_OBJECT_DATA, itemID })
            }
        } catch (error) {
            console.error(error)
        }
    }
}