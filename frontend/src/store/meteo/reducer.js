import * as types from './actionTypes'

const initialState = {
    statisticDay: {},
    archiveData: null,
    summaryData: {},
}

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.GET_STATISTIC_DAY:
            return {
                ...state,
                statisticDay: action.payload
            }

        case types.GET_SUMMARY:
            return {
                ...state,
                summaryData: action.payload
            }

        case types.GET_ARCHIVE:
            return {
                ...state,
                archiveData: action.payload
            }

        case types.CLEAR_ARCHIVE:
            return {
                ...state,
                archiveData: null
            }


        default:
            return state
    }
}