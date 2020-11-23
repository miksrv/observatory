import * as types from './actionTypes'

const initialState = {
    generalData: {}
}

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.GET_METEO_DATA:
            return {
                ...state,
                generalData: action.payload
            }

        default:
            return state
    }
}