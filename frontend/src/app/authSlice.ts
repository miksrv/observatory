import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { RootState } from './store'

interface IAuthState {
    status: boolean
    token: string | null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: { status: false, token: '' } as IAuthState,
    reducers: {
        setCredentials: (
            state,
            { payload: { status, token } }: PayloadAction<IAuthState> ) => {
            state.status = status
            state.token = token
        }
    }
})

export const { setCredentials } = authSlice.actions
// Example without useAppSelector hook
// export const getCredentials = (state: RootState) => state.auth

export default authSlice.reducer