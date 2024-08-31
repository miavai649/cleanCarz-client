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
    })
  })
})

export const { useAddSlotMutation, useGetAllSlotQuery } = slotApi
