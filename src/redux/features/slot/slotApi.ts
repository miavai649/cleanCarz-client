import { TResponseRedux, TSlot } from '../../../types'
import { baseApi } from '../../api/baseApi'

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlot: builder.query({
      query: (args) => {
        const params = new URLSearchParams()

        if (args.date) {
          params.append('date', args.date)
        }
        if (args.serviceId) {
          params.append('serviceId', args.serviceId)
        }
        return {
          url: '/slots/availability',
          method: 'GET',
          params: params
        }
      },
      transformResponse: (response: TResponseRedux<TSlot[]>) => {
        return {
          data: response.data
        }
      },
      providesTags: ['slot']
    }),
    getSingleSlot: builder.query({
      query: (args) => {
        return {
          url: `/slots/${args}`,
          method: 'GET'
        }
      },
      transformResponse: (response: TResponseRedux<TSlot>) => {
        return {
          data: response.data
        }
      },
      providesTags: ['slot']
    }),
    addSlot: builder.mutation({
      query: (data) => ({
        url: '/services/slots',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['slot']
    }),
    updateSlotStatus: builder.mutation({
      query: (args) => ({
        url: `/slots/${args.id}`,
        method: 'PUT',
        body: args.data
      }),
      invalidatesTags: ['slot']
    }),
    deleteSlot: builder.mutation({
      query: (args) => ({
        url: `/slots/${args}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['slot']
    })
  })
})

export const {
  useAddSlotMutation,
  useGetAllSlotQuery,
  useUpdateSlotStatusMutation,
  useDeleteSlotMutation,
  useGetSingleSlotQuery
} = slotApi
