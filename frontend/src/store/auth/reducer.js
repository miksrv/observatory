import * as types from './actionTypes'

const initialState = {
    authData: {},
    token: null,
    isAuth: false
}

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                authData: action.payload,
                isAuth: true
            }

        case types.CHECK:
            return {
                ...state,
                token: action.payload
            }

        case types.LOGOUT:
            return {
                ...state,
                authData: {},
                isAuth: false
            }

        default:
            return state
    }
}