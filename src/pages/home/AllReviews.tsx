/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllReviewsQuery } from '../../redux/features/review/reviewApi'
import { Avatar } from 'antd'
import moment from 'moment'
import { FaStar } from 'react-icons/fa'
import Spinner from '../../components/spinner/Spinner'

const AllReviews = () => {
  const { data: reviewData, isLoading: reviewLoading } = useGetAllReviewsQuery(
    {}
  )

  // Aggregate ratings data
  const ratingsCount = reviewData?.data?.reduce((acc: any, review: any) => {
    acc[review.rating] = (acc[review.rating] || 0) + 1
    return acc
  }, {})

  return (
    <div className='container mx-auto py-12'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h2 className='text-4xl font-extrabold text-gray-800 mb-4'>
          What Our Customers Say
        </h2>
        <p className='text-gray-600 text-lg mb-8'>
          Discover honest feedback from our valued clients and see why they
          trust us for their car wash needs.
        </p>
        <div className='w-24 mx-auto h-1 bg-primary-800 rounded'></div>
      </div>

      {reviewLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className='mb-12'>
            <div className='flex flex-wrap justify-center items-center gap-6'>
              {Array.from({ length: 5 }, (_, index) => (
                <div
                  key={index}
                  className='flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-36'>
                  <div className='text-4xl font-bold text-primary-800'>
                    {ratingsCount[index + 1] || 0}
                  </div>
                  <div className='flex items-center mt-2'>
                    {[...Array(index + 1)].map((_, starIndex) => (
                      <FaStar
                        key={starIndex}
                        size={28}
                        className='text-yellow-500'
                      />
                    ))}
                  </div>
                  <p className='text-sm text-gray-600 mt-2'>
                    {index + 1} Star{index === 0 ? '' : 's'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            {reviewData?.data?.length > 0 ? (
              reviewData?.data?.map((review: any) => (
                <div
                  key={review._id}
                  className='bg-white p-6 rounded-lg mb-8 shadow-lg border border-gray-200'>
                  <div className='flex items-center space-x-4'>
                    <Avatar
                      size={60}
                      className='cursor-pointer'
                      src={review.user?.image}
                      alt={review.user?.name}
                      style={{ backgroundColor: '#418FC8' }}>
                      {!review.user?.image && (
                        <span className='text-white text-lg font-bold'>
                          {review.user?.name?.charAt(0)}
                        </span>
                      )}
                    </Avatar>
                    <div>
                      <h4 className='text-xl font-semibold text-gray-900'>
                        {review.user?.name}
                      </h4>
                      <p className='text-sm text-gray-500'>
                        Submitted on{' '}
                        {moment(review.createdAt).format(
                          'MMMM Do, YYYY [at] h:mm A'
                        )}
                      </p>
                      <div className='flex items-center mt-2'>
                        {[...Array(review.rating)].map((_, index) => (
                          <FaStar
                            key={index}
                            size={24}
                            className='text-yellow-500'
                          />
                        ))}
                        {[...Array(5 - review.rating)].map((_, index) => (
                          <FaStar
                            key={index + review.rating}
                            size={24}
                            className='text-gray-300'
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className='mt-4 text-gray-700'>{review.review}</p>
                </div>
              ))
            ) : (
              <div className='text-center text-gray-600 text-lg'>
                No reviews available.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default AllReviews
