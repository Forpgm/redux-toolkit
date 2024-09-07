import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Post from 'pages/types/blog.type'

export const blogApi = createApi({
  reducerPath: 'blogApi', // This is the name of the slice | tên field của Redux state
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  endpoints: (builder) => ({
    // generic type theo thứ tự là kiểu response và argument
    getPosts: builder.query<Post[], void>({
      query: () => 'posts' // method không có argument
    })
  })
})
export const { useGetPostsQuery } = blogApi
