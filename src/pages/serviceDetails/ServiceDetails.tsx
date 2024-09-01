import { useState } from 'react'
import { Calendar, Button } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { useGetServiceQuery } from '../../redux/features/service/serviceApi'
import dayjs, { Dayjs } from 'dayjs'
import { useGetAllSlotQuery } from '../../redux/features/slot/slotApi'
import Spinner from '../../components/spinner/Spinner'
import { MdErrorOutline } from 'react-icons/md'

const ServiceDetails = () => {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  console.log('🚀 ~ ServiceDetails ~ selectedSlot:', selectedSlot)
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs())
  const formattedDate = selectedDate.format('YYYY-MM-DD')

  const { serviceId } = useParams()

  const { data: serviceData, isLoading: serviceLoading } =
    useGetServiceQuery(serviceId)

  const query = {
    date: formattedDate,
    serviceId: serviceData?.data?._id
  }

  const { data: slotData, isLoading: slotLoading } = useGetAllSlotQuery(query)

  const handleDateChange = (date: Dayjs) => {
    setSelectedDate(date)
  }

  return (
    <div className='container mx-auto py-12'>
      {/* service header */}
      <div className='text-center mb-12'>
        <h2 className='text-4xl font-extrabold text-gray-800 mb-4'>
          Service Details
        </h2>
        <p className='text-gray-600 text-lg'>
          Find everything you need to know about this service. Secure your spot
          and enjoy a pristine clean at your convenience.
        </p>
        <div className='mt-2 w-24 mx-auto h-1 bg-primary-800 rounded'></div>
      </div>

      {serviceLoading ? (
        <Spinner styling='h-screen' />
      ) : (
        <div className='max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
          {/* service image */}
          <div className='relative mb-6 rounded-lg overflow-hidden'>
            <img
              src={serviceData?.data?.image}
              className='w-full h-64 object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50'></div>
          </div>

          {/* service details */}
          <h1 className='text-3xl font-bold text-primary-600'>
            {serviceData?.data?.name}
          </h1>
          <p className='mt-2 text-lg font-semibold text-gray-800'>
            ৳{serviceData?.data?.price}
          </p>
          <p className='mt-1 text-base text-gray-600'>
            Duration: {serviceData?.data?.duration} Minutes
          </p>
          <p className='mt-4 text-gray-600'>{serviceData?.data?.description}</p>

          {/* calendar section */}
          <div className='mt-10'>
            <h2 className='text-2xl font-semibold text-gray-800 text-center mb-6'>
              Select a Date
            </h2>
            <div className='bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200'>
              <Calendar
                fullscreen={false}
                value={selectedDate}
                onSelect={handleDateChange}
                className='bg-white p-4 rounded-lg shadow-sm'
                headerRender={({ value, onChange }) => (
                  <div className='flex justify-between items-center px-4 py-2'>
                    <button
                      className='text-primary-600 hover:text-primary-800 font-semibold transition'
                      onClick={() => onChange(value.subtract(1, 'month'))}>
                      &lt; Previous
                    </button>
                    <span className='font-semibold text-gray-700'>
                      {value.format('MMMM YYYY')}
                    </span>
                    <button
                      className='text-primary-600 hover:text-primary-800 font-semibold transition'
                      onClick={() => onChange(value.add(1, 'month'))}>
                      Next &gt;
                    </button>
                  </div>
                )}
              />
              <div className='mt-4 flex justify-center'>
                <span className='inline-block bg-primary-500 text-white text-sm px-4 py-2 rounded-full'>
                  Selected Date: {formattedDate}
                </span>
              </div>
            </div>
          </div>

          {/* time slots */}
          <div className='mt-6'>
            <h2 className='text-xl font-semibold text-gray-800'>
              Available Time Slots:
            </h2>
            <p className='text-sm text-gray-600 mt-1'>
              (Time is displayed in 24-hour format)
            </p>
            {slotLoading ? (
              <Spinner styling='h-screen' />
            ) : slotData?.data?.length === 0 ? (
              <div className='mt-8 flex flex-col items-center justify-center'>
                <MdErrorOutline className='text-red-500 mb-4' size={48} />
                <p className='text-lg font-semibold text-gray-800'>
                  No slots are available on this date
                </p>
                <p className='text-sm text-gray-600 mt-1'>
                  Please select another date.
                </p>
              </div>
            ) : (
              <div className='mt-4 grid grid-cols-3 gap-4'>
                {slotData?.data?.map((slot) => (
                  <button
                    key={slot?._id}
                    onClick={() => setSelectedSlot(slot?._id)}
                    disabled={slot?.isBooked === 'booked'}
                    className={`rounded-lg py-2 px-4 font-medium transition-all duration-300 border-2 ${
                      selectedSlot === `${slot?._id}`
                        ? 'bg-secondary-700 text-white border-secondary-700 hover:bg-secondary-800'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:border-primary-500'
                    } ${
                      slot?.isBooked === 'booked'
                        ? 'cursor-not-allowed opacity-50'
                        : 'hover:bg-primary-100'
                    }`}>
                    {slot?.startTime} - {slot?.endTime}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* book button */}
          {selectedSlot && (
            <div className='mt-8 flex justify-center'>
              <Link to={`/booking-page/${serviceId}/${selectedSlot}`}>
                <Button
                  type='primary'
                  className='bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg shadow-md'>
                  Book This Service
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ServiceDetails
