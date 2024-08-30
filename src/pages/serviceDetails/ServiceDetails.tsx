import { useState } from 'react'
import { DatePicker, Button, DatePickerProps } from 'antd'
import { Link, useParams } from 'react-router-dom'
import { useGetServiceQuery } from '../../redux/features/service/serviceApi'

const ServiceDetails = () => {
  const [selectedSlot, setSelectedSlot] = useState(null)

  const { serviceId } = useParams()
  console.log('🚀 ~ ServiceDetails ~ serviceId:', serviceId)

  const { data: serviceData } = useGetServiceQuery(serviceId)
  console.log('🚀 ~ ServiceDetails ~ serviceData:', serviceData)

  const timeSlots = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM'
  ]
  const bookedSlots = ['11:00 AM', '01:00 PM']

  const handleSlotSelection = (slot: any) => {
    setSelectedSlot(slot)
  }

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString)
  }

  return (
    <div className='container mx-auto py-12'>
      {/* Header */}
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

      <div className='max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg'>
        {/* Service Image */}
        <div className='relative mb-6 rounded-lg overflow-hidden'>
          <img
            src={serviceData?.data?.image}
            className='w-full h-64 object-cover'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50'></div>
        </div>

        {/* Service Details */}
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

        {/* Date Picker */}
        <div className='mt-6'>
          <h2 className='text-xl font-semibold text-gray-800'>
            Select a Date:
          </h2>
          <DatePicker
            onChange={onChange}
            className='mt-2 w-full'
            style={{ borderRadius: '8px', padding: '8px' }}
          />
        </div>

        {/* Time Slots */}
        <div className='mt-6'>
          <h2 className='text-xl font-semibold text-gray-800'>
            Available Time Slots:
          </h2>
          <div className='mt-4 grid grid-cols-3 gap-4'>
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                onClick={() => handleSlotSelection(slot)}
                disabled={bookedSlots.includes(slot)}
                className={`rounded-lg py-2 px-4 ${
                  selectedSlot === slot
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                } ${
                  bookedSlots.includes(slot)
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:bg-primary-100'
                }`}>
                {slot}
              </Button>
            ))}
          </div>
        </div>

        {/* Book Button */}
        {selectedSlot && (
          <div className='mt-8 flex justify-center'>
            <Link to={'/booking-page'}>
              <Button
                type='primary'
                className='bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg shadow-md'>
                Book This Service
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceDetails
