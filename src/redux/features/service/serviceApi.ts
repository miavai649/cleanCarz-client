import { TResponseRedux, TService } from '../../../types'
import { baseApi } from '../../api/baseApi'

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllService: builder.query({
      query: (args) => {
        const params = new URLSearchParams()

        if (args.searchTerm) {
          params.append('search', args.searchTerm)
        }
        if (args.duration) {
          params.append('duration', args.duration)
        }
        if (args.sortOrder) {
          params.append('sort', args.sortOrder)
        }

        return {
          url: '/services',
          method: 'GET',
          params: params
        }
      },
      transformResponse: (response: TResponseRedux<TService[]>) => {
        return {
          data: response.data
        }
      },
      providesTags: ['service']
    }),
    getService: builder.query({
      query: (args) => {
        return {
          url: `/services/${args}`,
          method: 'GET'
        }
      },
      transformResponse: (response: TResponseRedux<TService>) => {
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
    }),
    updateService: builder.mutation({
      query: (args) => {
        return {
          url: `/services/${args.serviceId}`,
          method: 'PUT',
          body: args.data
        }
      },
      invalidatesTags: ['service']
    }),
    deleteService: builder.mutation({
      query: (args) => {
        return {
          url: `/services/${args}`,
          method: 'DELETE',
          body: args
        }
      },
      invalidatesTags: ['service']
    })
  })
})

export const {
  useGetAllServiceQuery,
  useAddServiceMutation,
  useGetServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation
} = serviceApi
