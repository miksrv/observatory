import * as types from './actionTypes'

const initialState = {
    meteoData: {},
    meteoStat: {},
    meteoEvents: {}
}

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.GET_METEO_DATA:
            return {
                ...state,
                meteoData: action.payload
            }

        case types.GET_METEO_STAT:
            return {
                ...state,
                meteoStat: action.payload
            }

        case types.GET_METEO_EVENTS:
            return {
                ...state,
                meteoEvents: action.payload
            }

        default:
            return state
    }
}