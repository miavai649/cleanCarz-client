import { baseApi } from '../../api/baseApi'

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllService: builder.query({
      query: () => ({
        url: '/services',
        method: 'GET'
      })
    })
    // login: builder.mutation({
    //   query: (data) => ({
    //     url: '/auth/login',
    //     method: 'POST',
    //     body: data
    //   })
    // })
  })
})

export const { useGetAllServiceQuery } = serviceApi
