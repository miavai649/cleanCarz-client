import { TResponseRedux, TUser } from '../../../types'
import { baseApi } from '../../api/baseApi'

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/auth/signup',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['user']
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['user']
    }),
    getAllUsers: builder.query({
      query: () => {
        return {
          url: '/slots/availability',
          method: 'GET'
        }
      },
      transformResponse: (response: TResponseRedux<TUser>) => {
        return {
          data: response.data
        }
      },
      providesTags: ['user']
    })
  })
})

export const { useRegisterMutation, useLoginMutation } = authApi
