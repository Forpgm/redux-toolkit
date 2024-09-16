import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Post from '../types/blog.type'
import { build } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle'
import { error } from 'console'
import { url } from 'inspector'
import { CustomError } from 'utils/helpers'
export const blogApi = createApi({
  reducerPath: 'blogApi', // This is the name of the slice | tên field của Redux state
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  tagTypes: ['Posts'],
  endpoints: (builder) => ({
    // generic type theo thứ tự là kiểu response và argument
    getPosts: builder.query<Post[], void>({
      query: () => 'posts', // method không có argument
      providesTags(result) {
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
            { type: 'Posts' as const, id: 'LIST' }
          ]
          return final
        }
        const final = [{ type: 'Posts' as const, id: 'LIST' }]
        return final
      }
    }),
    addPost: builder.mutation<Post, Omit<Post, 'id'>>({
      query: (body) => {
        try {
          let a: any = null
          a.b = 1
          return {
            url: 'posts',
            method: 'POST',
            body
          }
        } catch (error: any) {
          throw new CustomError(error.message)
        }
      },
      invalidatesTags: (result, error, body) => (error ? [] : [{ type: 'Posts', id: 'LIST' }])
    }),
    getPostItem: builder.query<Post, string>({
      query: (id) => `posts/${id}`
    }),
    updatePost: builder.mutation<Post, { id: string; body: Post }>({
      query: (data) => {
        return {
          url: `posts/${data.id}`,
          method: 'PUT',
          body: data.body
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Posts', id: data.id }])
    }),
    deletePost: builder.mutation<{}, string>({
      query: (id) => {
        return {
          url: `posts/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id }]
    })
  })
})
export const {
  useGetPostsQuery,
  useAddPostMutation,
  useGetPostItemQuery,
  useUpdatePostMutation,
  useDeletePostMutation
} = blogApi
