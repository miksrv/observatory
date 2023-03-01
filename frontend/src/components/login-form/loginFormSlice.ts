import { createSlice } from '@reduxjs/toolkit'

interface ILoginFormState {
    visible: boolean
}

const initialState: ILoginFormState = {
    visible: false
}

export const loginFormSlice = createSlice({
    initialState,
    name: 'loginform',
    reducers: {
        hide: (state) => {
            state.visible = false
        },
        show: (state) => {
            state.visible = true
        },
        toggle: (state) => {
            state.visible = !state.visible
        }
    }
})

export const { show, hide, toggle } = loginFormSlice.actions

export default loginFormSlice.reducer
