import { createAction, createReducer, nanoid } from '@reduxjs/toolkit'
import { initalPostList } from 'constants/blog'
import Post from 'pages/types/blog.type'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
}
const initialState: BlogState = {
  postList: initalPostList,
  editingPost: null
}
export const addPost = createAction('blog/addPost', (post: Omit<Post, 'id'>) => {
  return {
    payload: {
      ...post,
      id: nanoid()
    }
  }
})
export const deletePost = createAction<string>('blog/deletePost')
export const startEditingPost = createAction<string>('blog/startEditingPost')
export const finishEditingPost = createAction<Post>('blog/finishEditingPost')
export const cancelEditingPost = createAction('blog/cancelEditingPost')
const blogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addPost, (state, action) => {
      const newPost = action.payload
      console.log(newPost)
      state.postList.push(newPost)
    })
    .addCase(deletePost, (state, action) => {
      const postId = action.payload
      state.postList = state.postList.filter((post) => post.id !== postId)
    })
    .addCase(startEditingPost, (state, action) => {
      const postId = action.payload
      const foundPost = state.postList.find((post) => post.id === postId) || null
      state.editingPost = foundPost
    })
    .addCase(finishEditingPost, (state, action) => {
      const index = state.postList.findIndex((post) => post.id === state.editingPost!.id)
      if (index !== -1) {
        state.postList[index] = action.payload
      }
      state.editingPost = null
    })
    .addCase(cancelEditingPost, (state, action) => {
      state.editingPost = null
    })
})
export default blogReducer
