import { configureStore } from '@reduxjs/toolkit'

import loginFormSlice from 'components/login-form/loginFormSlice'
import sidebarSlice from 'components/sidebar/sidebarSlice'

import authSlice from './authSlice'
import { observatoryApi } from './observatoryApi'

export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(observatoryApi.middleware),
    reducer: {
        auth: authSlice,
        loginForm: loginFormSlice,
        sidebar: sidebarSlice,

        // Add the generated reducer as a specific top-level slice
        [observatoryApi.reducerPath]: observatoryApi.reducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
