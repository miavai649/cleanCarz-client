import { baseApi } from '../api/api'

const todoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priority) => {
        const params = new URLSearchParams()

        if (priority) {
          params.append('priority', priority)
        }

        return {
          url: '/tasks',
          method: 'GET',
          params: params
        }
      },
      providesTags: ['todo']
    }),
    addTodo: builder.mutation({
      query: (data) => ({
        url: '/task',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['todo']
    }),
    toggleTodo: builder.mutation({
      query: (data) => {
        console.log('🚀 ~ Inside base api:', data)
        return {
          url: `/task/${data.id}`,
          method: 'PUT',
          body: data.data
        }
      },
      invalidatesTags: ['todo']
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `task/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['todo']
    }),
    updateTodo: builder.mutation({
      query: (options) => {
        return {
          url: `task/${options.id}`,
          method: 'PUT',
          body: options.data
        }
      },
      invalidatesTags: ['todo']
    })
  })
})

export const { useGetTodosQuery } = todoApi
