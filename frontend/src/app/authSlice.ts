import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IRestAuth } from './types'

// import { RootState } from './store'

export const authSlice = createSlice({
    initialState: { status: false, token: '' } as IRestAuth,
    name: 'auth',
    reducers: {
        setCredentials: (
            state,
            { payload: { status, token } }: PayloadAction<IRestAuth>
        ) => {
            state.status = status
            state.token = token
        }
    }
})

export const { setCredentials } = authSlice.actions
// Example without useAppSelector hook
// export const getCredentials = (state: RootState) => state.auth

export default authSlice.reducer
