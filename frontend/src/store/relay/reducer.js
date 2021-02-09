import * as types from './actionTypes'

const initialState = {
    relayStatus: {},
    relayCurrent: [],
}

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.GET_STATUS:
            return {
                ...state,
                relayStatus: action.payload
            }

        case types.SET_STATUS:
            return {
                ...state,
                relayCurrent: action.payload
            }

        default:
            return state
    }
}