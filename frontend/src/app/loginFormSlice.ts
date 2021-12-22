import { createSlice } from '@reduxjs/toolkit'

interface ILoginFormState {
    visible: boolean
}

const initialState: ILoginFormState = {
    visible: false
}

export const loginFormSlice = createSlice({
    name: 'loginform',
    initialState,
    reducers: {
        show: (state) => {
            state.visible = true
        },
        hide: (state) => {
            state.visible = false
        },
        toggle: (state) => {
            state.visible = !state.visible
        },
    }
})

export const { show, hide, toggle } = loginFormSlice.actions

export default loginFormSlice.reducer
