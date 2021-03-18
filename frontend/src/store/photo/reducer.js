import * as types from './actionTypes'

const initialState = {
    dataList: [],
    dataItem: {},
}

export default function reduce(state = initialState, action = {}) {
    switch (action.type) {
        case types.GET_LIST:
            return {
                ...state,
                dataList: action.payload,
            }

        case types.GET_ITEM:
            return {
                ...state,
                dataItem: action.payload,
            }

        case types.CLEAR_ITEM:
            return {
                ...state,
                dataItem: {},
            }

        default:
            return state
    }
}