import { TResponseRedux, TService } from '../../../types'
import { baseApi } from '../../api/baseApi'

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllService: builder.query({
      query: () => ({
        url: '/services',
        method: 'GET'
      }),
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
