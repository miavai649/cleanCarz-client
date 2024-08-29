import { baseApi } from '../../api/baseApi'

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllService: builder.query({
      query: () => ({
        url: '/services',
        method: 'GET'
      })
    }),
    addService: builder.mutation({
      query: (data) => ({
        url: '/services',
        method: 'POST',
        body: data
      })
    })
  })
})

export const { useGetAllServiceQuery, useAddServiceMutation } = serviceApi
