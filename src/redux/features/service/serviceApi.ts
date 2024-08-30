import { TResponseRedux, TService } from '../../../types'
import { baseApi } from '../../api/baseApi'

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllService: builder.query({
      query: (args) => {
        let query = `/services?`

        if (args.searchTerm)
          query += `search=${encodeURIComponent(args.searchTerm)}&`
        if (args.duration) query += `duration=${args.duration}&`
        if (args.sortOrder) query += `sort=${args.sortOrder}&`

        return {
          url: query,
          method: 'GET'
        }
      },
      transformResponse: (response: TResponseRedux<TService[]>) => {
        return {
          data: response.data
        }
      },
      providesTags: ['service']
    }),
    addService: builder.mutation({
      query: (data) => ({
        url: '/services',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['service']
    })
  })
})

export const { useGetAllServiceQuery, useAddServiceMutation } = serviceApi
