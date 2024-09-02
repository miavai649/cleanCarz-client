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
      invalidatesTags: ['user', 'booking']
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['user', 'booking']
    }),
    getAllUsers: builder.query({
      query: () => {
        return {
          url: '/auth/users',
          method: 'GET'
        }
      },
      transformResponse: (response: TResponseRedux<TUser[]>) => {
        return {
          data: response.data
        }
      },
      providesTags: ['user']
    }),
    getMe: builder.query({
      query: () => {
        return {
          url: '/auth/me',
          method: 'GET'
        }
      },
      transformResponse: (response: TResponseRedux<TUser>) => {
        return {
          data: response.data
        }
      },
      providesTags: ['user']
    }),
    updateRole: builder.mutation({
      query: (args) => ({
        url: `/auth/user/${args?.id}`,
        method: 'PUT',
        body: args?.data
      }),
      invalidatesTags: ['user']
    }),
    updateUser: builder.mutation({
      query: (args) => ({
        url: `/auth/me/${args?.id}`,
        method: 'PUT',
        body: args?.data
      }),
      invalidatesTags: ['user']
    })
  })
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAllUsersQuery,
  useUpdateRoleMutation,
  useGetMeQuery,
  useUpdateUserMutation
} = authApi
