// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

import * as types from './actionTypes'

const initialState = {
    FITStat: {},
    sensorData: {},
    sensorStat: {},
    relayData: {},
    statistic: {},
    objectData: [],
    graphic: {},

    token: []
}

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.GET_FITS_STAT:
            return {
                ...state,
                FITStat: action.payload
            }

        case types.GET_RELAY_DATA:
            return {
                ...state,
                relayData: action.payload
            }

        case types.GET_SENSOR_DATA:
            return {
                ...state,
                sensorData: action.payload
            }


        case types.GET_SENSOR_STAT:
            return {
                ...state,
                sensorStat: action.payload
            }

        case types.GET_STAT_DATA:
            return {
                ...state,
                statistic: action.payload
            }

        case types.GET_GRAPH_DATA:
            return {
                ...state,
                graphic: action.payload
            }

        case types.GET_OBJECT_DATA:
            return {
                ...state,
                objectData: action.payload
            }

        case types.POST_AUTH_LOGIN:
            return {
                ...state,
                token: action.payload
            }

        default:
            return state
    }
}