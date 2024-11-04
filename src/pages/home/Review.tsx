import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FaStar } from 'react-icons/fa'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { MdErrorOutline } from 'react-icons/md'
import { useAppSelector } from '../../redux/hook'
import { useCurrentToken } from '../../redux/features/auth/authSlice'
import { Link } from 'react-router-dom'
import {
  useAddReviewMutation,
  useGetAllReviewsQuery
} from '../../redux/features/review/reviewApi'
import { toast } from 'sonner'
import { TResponse } from '../../types'
import Spinner from '../../components/spinner/Spinner'
import moment from 'moment'
import { Avatar } from 'antd'
import SectionHeader from '../../components/ui/SectionHeader'

const headingProps = {
  heading: 'Share Your Experience',
  description:
    'Your feedback matters! Help us keep our standards high by sharing your thoughts on our services. We value every review and strive to make your next experience even better.'
}

const Review = () => {
  const [hover, setHover] = useState(0)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors }
  } = useForm()

  const rating = watch('rating')

  const { data: reviewData, isLoading: reviewLoading } = useGetAllReviewsQuery(
    {}
  )

  const [addReview] = useAddReviewMutation()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Submitting your review...')

    const reviewData = {
      ...data
    }

    try {
      const res = (await addReview(reviewData)) as TResponse<any>

      if (res.error) {
        toast.error('Failed to create service', {
          duration: 2000,
          id: toastId
        })
      } else {
        toast.success('Service created successfully', {
          duration: 2000,
          id: toastId
        })
      }
    } catch (error) {
      toast.error('Something went wrong', {
        duration: 2000,
        id: toastId
      })
    }

    reset()
  }

  const token = useAppSelector(useCurrentToken)

  return (
    <div className='relative container mx-auto py-12'>
      {/* Black Overlay */}
      {!token && (
        <div className='absolute inset-0 z-10 bg-black rounded-md bg-opacity-70 flex items-center justify-center'>
          <div className='bg-white p-8 rounded-lg shadow-lg text-center animate-fade-in'>
            <IoMdCheckmarkCircleOutline
              size={48}
              className='text-green-500 mb-4 mx-auto animate-bounce'
            />
            <h3 className='text-2xl font-semibold mb-4 animate-slide-in'>
              Please Log In
            </h3>
            <p className='mb-4 text-gray-700 animate-slide-in'>
              You need to be logged in to leave a review.
            </p>
            <Link to={'/login'}>
              <button className='bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all animate-button-hover transform hover:scale-105'>
                Log In
              </button>
            </Link>
          </div>
        </div>
      )}

      <div className='bg-white p-8 rounded-lg shadow-lg animate-slide-up'>
        <SectionHeader props={headingProps} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex items-center mb-4 animate-fade-in'>
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1
              return (
                <FaStar
                  key={currentRating}
                  size={36}
                  className={`cursor-pointer transition-transform transform ${
                    currentRating <= (hover || rating)
                      ? 'text-secondary-500 '
                      : 'text-gray-300'
                  } hover:scale-125`}
                  onClick={() => setValue('rating', currentRating)}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(0)}
                />
              )
            })}
          </div>

          <textarea
            className='w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4 animate-fade-in'
            placeholder='Share your experience...'
            {...register('review', { required: true })}
            rows={5}></textarea>

          {errors.review && (
            <p className='text-red-500 mb-4 flex items-center animate-slide-in'>
              <MdErrorOutline size={20} className='mr-2' />
              Review is required.
            </p>
          )}

          <button
            type='submit'
            className='bg-primary-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-700 transition-all animate-button-hover transform hover:scale-105'>
            Submit Review
          </button>
        </form>

        <div className='mt-8'>
          <h3 className='text-2xl font-bold mb-4 text-gray-900 animate-slide-in'>
            Overall Rating:{' '}
            {(
              reviewData?.data?.reduce(
                (acc: any, review: any) => acc + review.rating,
                0
              ) / reviewData?.data?.length || 0
            ).toFixed(2)}
            /5
          </h3>

          {reviewLoading ? (
            <Spinner styling='h-screen' />
          ) : (
            <div>
              {reviewData?.data?.slice(0, 2).map((review: any) => (
                <div
                  key={review?._id}
                  className='bg-white p-6 rounded-lg mb-6 shadow-lg animate-slide-up space-y-4'>
                  <div className='flex items-center space-x-4'>
                    <div className='flex-shrink-0'>
                      <Avatar
                        size={50}
                        className='cursor-pointer'
                        src={review?.user?.image}
                        alt={review?.user?.name}
                        style={{
                          backgroundColor: '#418FC8',
                          verticalAlign: 'middle'
                        }}>
                        {!review?.user?.image && (
                          <span
                            style={{
                              fontSize: '1rem',
                              fontWeight: 'bold',
                              color: 'white'
                            }}>
                            {review?.user?.name?.charAt(0)}
                          </span>
                        )}
                      </Avatar>
                    </div>

                    <div className='flex flex-col'>
                      <h4 className='text-lg font-semibold text-gray-900'>
                        {review?.user?.name}
                      </h4>
                      <p className='text-sm text-gray-500'>
                        Submitted on{' '}
                        {moment(review?.createdAt).format(
                          'MMMM Do, YYYY [at] h:mm A'
                        )}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center'>
                    {[...Array(review?.rating)].map((_, index) => (
                      <FaStar
                        key={index}
                        size={20}
                        className='text-secondary-500 animate-star'
                      />
                    ))}
                  </div>

                  <p className='text-gray-700 leading-relaxed'>
                    {review?.review}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <Link to={'/reviews'}>
          <button className='text-primary-500 hover:underline mt-4 animate-slide-in transform hover:scale-105'>
            See All Reviews
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Review
