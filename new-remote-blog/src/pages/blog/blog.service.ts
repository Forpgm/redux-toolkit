import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Post from '../types/blog.type'
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
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }]
    })
  })
})
export const { useGetPostsQuery, useAddPostMutation } = blogApi
