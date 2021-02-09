import * as types from './actionTypes'

const initialState = {
    authData: {},
    token: null
}

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                authData: action.payload
            }

        case types.CHECK:
            return {
                ...state,
                token: action.payload
            }

        default:
            return state
    }
}