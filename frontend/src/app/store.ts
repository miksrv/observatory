import { configureStore } from '@reduxjs/toolkit'
import { observatoryApi } from './observatoryApi'
import updateSlice from './updateSlice'
import sidebarSlice from './sidebarSlice'

export const store = configureStore({
    reducer: {
        update: updateSlice,
        sidebar: sidebarSlice,

        // Add the generated reducer as a specific top-level slice
        [observatoryApi.reducerPath]: observatoryApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(observatoryApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
