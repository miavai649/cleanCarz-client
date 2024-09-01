import { baseApi } from '../../api/baseApi'

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // getAllSlot: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams()

    //     if (args.date) {
    //       params.append('date', args.date)
    //     }
    //     if (args.serviceId) {
    //       params.append('serviceId', args.serviceId)
    //     }
    //     return {
    //       url: '/slots/availability',
    //       method: 'GET',
    //       params: params
    //     }
    //   },
    //   transformResponse: (response: TResponseRedux<TSlot[]>) => {
    //     return {
    //       data: response.data
    //     }
    //   },
    //   providesTags: ['slot']
    // }),
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

export const { useCreateBookingMutation } = bookingApi
