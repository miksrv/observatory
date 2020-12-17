// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

import * as types from './actionTypes'

const initialState = {
    authData: {}
}

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.POST_AUTH_LOGIN:
            return {
                ...state,
                authData: action.payload
            }

        default:
            return state
    }
}