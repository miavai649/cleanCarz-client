import { Button, Input, Form, DatePicker, TimePicker } from 'antd'
import moment from 'moment'
import 'antd/dist/reset.css' // Make sure to import Ant Design styles

const BookingPage = () => {
  return (
    <div className='container mx-auto py-12'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h2 className='text-4xl font-extrabold text-gray-800 mb-4'>
          Confirm Your Booking
        </h2>
        <p className='text-gray-600 text-lg'>
          You're just a step away from a spotless car! Review your selected
          service and time, then complete the form to confirm your booking.
        </p>
        <div className='mt-2 w-24 mx-auto h-1 bg-primary-800 rounded'></div>
      </div>

      <div className=' p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12'>
        <div className='flex flex-col md:flex-row md:space-x-6'>
          {/* Left Side: Display Selected Service and Time Slot */}
          <div className='flex-1 bg-white rounded-lg shadow-xl p-4 md:p-6'>
            <h2 className='text-xl font-semibold text-primary-600 mb-4'>
              Selected Service
            </h2>
            <div className='border border-gray-200 rounded-lg p-4'>
              <img
                src='https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
                alt='Service'
                className='w-full h-40 object-cover rounded-md'
              />
              <h3 className='text-lg font-semibold text-gray-800 mt-2'>
                Premium Car Wash
              </h3>
              <p className='text-gray-600 mt-2'>
                A comprehensive car wash that includes interior and exterior
                cleaning.
              </p>
              <p className='text-primary-600 font-bold mt-2'>$25.00</p>
              <p className='text-gray-500 mt-1'>Duration: 30 Minutes</p>
            </div>

            <div className='mt-6'>
              <h2 className='text-xl font-semibold text-primary-600 mb-4'>
                Selected Time Slot
              </h2>
              <div className='border border-gray-200 rounded-lg p-4'>
                <p className='text-gray-600'>
                  Date: {moment().format('MMMM D, YYYY')}
                </p>
                <p className='text-gray-600'>Time: 10:00 AM - 11:00 AM</p>
              </div>
            </div>
          </div>
          {/* Responsive Divider */}
          <div className='md:hidden my-6 border-t border-gray-300'></div>{' '}
          {/* Horizontal divider on small screens */}
          <div className='hidden md:block w-px bg-gray-300 mx-6'></div>{' '}
          {/* Vertical divider on medium and larger screens */}
          {/* Right Side: Booking Form */}
          <div className='flex-1 bg-white rounded-lg shadow-lg p-4 md:p-6'>
            <h2 className='text-2xl text-center font-semibold text-primary-600 mb-4'>
              Customer Details
            </h2>
            <Form layout='vertical'>
              <Form.Item name='name' label='Name' initialValue='John Doe'>
                <Input placeholder='Enter your name' />
              </Form.Item>

              <Form.Item
                name='email'
                label='Email'
                initialValue='john.doe@example.com'>
                <Input type='email' placeholder='Enter your email' />
              </Form.Item>

              <Form.Item name='date' label='Date' initialValue={moment()}>
                <DatePicker
                  format='YYYY-MM-DD'
                  style={{ width: '100%' }}
                  defaultValue={moment()}
                />
              </Form.Item>

              <Form.Item
                name='time'
                label='Time Slot'
                initialValue={[
                  moment('10:00', 'HH:mm'),
                  moment('11:00', 'HH:mm')
                ]}>
                <TimePicker.RangePicker
                  format='HH:mm'
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='w-full bg-primary-500 hover:bg-primary-600'>
                  Pay Now
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
