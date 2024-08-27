import { configureStore } from '@reduxjs/toolkit'
import blogReducer from 'pages/blog/blog.reducer'
export const store = configureStore({
  reducer: { blog: blogReducer }
})

// lấy rootState và AppDispatch từ store
export type rootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
