import { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FaStar } from 'react-icons/fa'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { MdErrorOutline } from 'react-icons/md'

const Review = () => {
  const [hover, setHover] = useState(0)
  const [isLogin, setIsLogin] = useState(false)
  // const [reviews, setReviews] = useState([
  //   {
  //     id: 1,
  //     rating: 5,
  //     feedback: 'Excellent service, very satisfied!'
  //   },
  //   {
  //     id: 2,
  //     rating: 4,
  //     feedback: 'Great service, but the waiting time was a bit long.'
  //   }
  // ])

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors }
  } = useForm()

  const rating = watch('rating')

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log('Form Data:', data)
    reset()
  }

  return (
    <div className='relative container mx-auto py-12'>
      {/* Black Overlay */}
      {!isLogin && (
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
            <button
              className='bg-primary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-all animate-button-hover transform hover:scale-105'
              onClick={() => {
                setIsLogin(true)
              }}>
              Log In
            </button>
          </div>
        </div>
      )}

      <div className='bg-white p-8 rounded-lg shadow-lg animate-slide-up'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-extrabold text-gray-800 mb-4 animate-slide-in'>
            Share Your Experience
          </h2>
          <p className='text-gray-600 text-lg animate-slide-in'>
            Your feedback matters! Help us keep our standards high by sharing
            your thoughts on our services. We value every review and strive to
            make your next experience even better.
          </p>
          <div className='mt-2 w-24 mx-auto h-1 bg-primary-800 rounded animate-expand'></div>
        </div>

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
            {...register('feedback', { required: true })}
            rows={5}></textarea>

          {errors.feedback && (
            <p className='text-red-500 mb-4 flex items-center animate-slide-in'>
              <MdErrorOutline size={20} className='mr-2' />
              Feedback is required.
            </p>
          )}

          <button
            type='submit'
            className='bg-primary-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-primary-700 transition-all animate-button-hover transform hover:scale-105'>
            Submit Review
          </button>
        </form>

        {/* <div className='mt-8'>
          <h3 className='text-2xl font-bold mb-4 text-gray-900 animate-slide-in'>
            Overall Rating:{' '}
            {reviews.reduce((acc, review) => acc + review.rating, 0) /
              reviews.length || 0}
            /5
          </h3>

          {reviews.slice(0, 2).map((review) => (
            <div
              key={review.id}
              className='bg-gray-100 p-4 rounded-lg mb-4 shadow-md animate-slide-up'>
              <div className='flex items-center mb-2'>
                {[...Array(review.rating)].map((_, index) => (
                  <FaStar
                    key={index}
                    size={20}
                    className='text-secondary-500 animate-star'
                  />
                ))}
              </div>
              <p className='text-gray-700'>{review.feedback}</p>
            </div>
          ))}
        </div> */}

        <button className='text-primary-500 hover:underline mt-4 animate-slide-in transform hover:scale-105'>
          See All Reviews
        </button>
      </div>
    </div>
  )
}

export default Review
