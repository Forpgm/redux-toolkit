import { createSlice } from '@reduxjs/toolkit'

interface BlogState {
  postId: string
}
export const initialState: BlogState = {
  postId: ''
}
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {}
})
const blogReducer = blogSlice.reducer
export default blogReducer
