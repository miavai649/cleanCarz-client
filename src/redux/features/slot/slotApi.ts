import { TResponseRedux, TSlot } from '../../../types'
import { baseApi } from '../../api/baseApi'

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSlot: builder.query({
      query: () => {
        return {
          url: '/slots/availability',
          method: 'GET'
        }
      },
      transformResponse: (response: TResponseRedux<TSlot[]>) => {
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
  useDeleteSlotMutation
} = slotApi
