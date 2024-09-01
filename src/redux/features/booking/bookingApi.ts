import { TResponseRedux } from '../../../types'
import { TBooking } from '../../../types/booking.type'
import { baseApi } from '../../api/baseApi'

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooking: builder.query({
      query: () => {
        return {
          url: '/bookings',
          method: 'GET'
        }
      },
      transformResponse: (response: TResponseRedux<TBooking[]>) => {
        return {
          data: response.data
        }
      },
      providesTags: ['booking']
    }),
    createBooking: builder.mutation({
      query: (data) => ({
        url: '/bookings',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['booking']
    })
  })
})

export const { useCreateBookingMutation, useGetAllBookingQuery } = bookingApi
