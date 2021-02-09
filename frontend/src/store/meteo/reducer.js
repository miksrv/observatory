import * as types from './actionTypes'

const initialState = {
    statisticDay: {},

    meteoData: {},
    meteoStat: {},
    meteoEvents: []
}

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.GET_STATISTIC_DAY:
            return {
                ...state,
                statisticDay: action.payload
            }

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

        case types.CLEAR_METEO_EVENTS:
            return {
                ...state,
                meteoEvents: []
            }

        default:
            return state
    }
}