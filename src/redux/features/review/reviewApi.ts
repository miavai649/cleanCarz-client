import { TResponseRedux } from '../../../types'
import { baseApi } from '../../api/baseApi'

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReviews: builder.query({
      query: () => {
        return {
          url: '/review',
          method: 'GET'
        }
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data
        }
      },
      providesTags: ['review']
    }),
    addReview: builder.mutation({
      query: (data) => ({
        url: '/review',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['review']
    })
  })
})

export const { useAddReviewMutation, useGetAllReviewsQuery } = reviewApi
