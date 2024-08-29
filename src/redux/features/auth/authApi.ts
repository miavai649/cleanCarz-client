import { baseApi } from '../../api/baseApi'

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/auth/signup',
        method: 'POST',
        body: data
      })
    })
    // login: builder.mutation({
    //   query: (userInfo) => ({
    //     url: '/auth/login',
    //     method: 'POST',
    //     body: userInfo
    //   })
    // })
  })
})

export const { useRegisterMutation } = authApi
