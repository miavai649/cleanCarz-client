import { useParams } from 'react-router-dom'
import { useGetServiceQuery } from '../../redux/features/service/serviceApi'
import { useGetSingleSlotQuery } from '../../redux/features/slot/slotApi'
import SelectedServiceAndSlot from './SelectedServiceAndSlot'
import CForm from '../../components/form/CForm'
import CInput from '../../components/form/CInput'
import { Button, Col, Form, Row, TimePicker } from 'antd'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import dayjs from 'dayjs'
import Spinner from '../../components/spinner/Spinner'
import { useAppSelector } from '../../redux/hook'
import { useCurrentUser } from '../../redux/features/auth/authSlice'
import CSelect from '../../components/form/CSelect'
import { useCreateBookingMutation } from '../../redux/features/booking/bookingApi'
import { TResponse } from '../../types'
import { toast } from 'sonner'
const BookingPage = () => {
  const { serviceId, slotId } = useParams()

  const user = useAppSelector(useCurrentUser)
  // create booking rtk query
  const [createBooking] = useCreateBookingMutation()

  const defaultValue = {
    userName: '',
    userEmail: user?.userEmail
  }

  const { data: serviceData, isLoading: serviceLoading } =
    useGetServiceQuery(serviceId)

  const { data: slotData, isLoading: slotLoading } =
    useGetSingleSlotQuery(slotId)

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const bookingData = {
      serviceId: serviceId,
      slotId: slotId,
      vehicleType: data?.vehicleType,
      vehicleBrand: data?.vehicleBrand,
      vehicleModel: data?.vehicleModel,
      manufacturingYear: Number(data?.manufacturingYear),
      registrationPlate: data?.registrationPlate
    }

    try {
      const res = (await createBooking(bookingData)) as TResponse<any>

      if (res.error) {
        toast.error('Failed to create Booking', {
          duration: 2000
        })
      } else {
        toast.success('Booking created successfully', {
          duration: 2000
        })
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const vehicleTypeOptions = [
    {
      value: 'car',
      label: 'Car'
    },
    {
      value: 'truck',
      label: 'Truck'
    },
    {
      value: 'SUV',
      label: 'SUV'
    },
    {
      value: 'van',
      label: 'Van'
    },
    {
      value: 'motorcycle',
      label: 'Motorcycle'
    },
    {
      value: 'bus',
      label: 'Bus'
    },
    {
      value: 'electricVehicle',
      label: 'Electric Vehicle'
    },
    {
      value: 'hybridVehicle',
      label: 'Hybrid Vehicle'
    },
    {
      value: 'bicycle',
      label: 'Bicycle'
    },
    {
      value: 'tractor',
      label: 'Tractor'
    }
  ]

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
      {serviceLoading || slotLoading ? (
        <Spinner styling='h-screen' />
      ) : (
        <div className=' p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12'>
          <div className='flex flex-col md:flex-row md:space-x-6'>
            {/*  selected service and time slot */}
            <SelectedServiceAndSlot
              serviceData={serviceData?.data!}
              slotData={slotData?.data!}
            />
            {/* horizontal divider for small screens */}
            <div className='md:hidden my-6 border-t border-gray-300'></div>
            {/* vertical divider for larger screens */}
            <div className='hidden md:block w-px bg-gray-300 mx-6'></div>
            {/*  booking form */}
            <div className='flex-1 bg-white rounded-lg shadow-lg p-4 md:p-6'>
              <h2 className='text-2xl text-center font-semibold text-primary-600 mb-4'>
                Customer Details
              </h2>
              <CForm onSubmit={onSubmit} defaultValues={defaultValue}>
                <CInput name='userName' type='text' label='Full Name' />
                <CInput name='userEmail' type='email' label='Email' />
                <Row gutter={8}>
                  <Col span={24} md={{ span: 12 }}>
                    <CSelect
                      name='vehicleType'
                      label='Vehicle Type'
                      options={vehicleTypeOptions}
                    />
                  </Col>

                  <Col span={24} md={{ span: 12 }}>
                    <CInput
                      name='vehicleBrand'
                      type='text'
                      label='Vehicle Brand'
                    />
                  </Col>
                  <Col span={24} md={{ span: 12 }}>
                    <CInput
                      name='vehicleModel'
                      type='text'
                      label='Vehicle Model'
                    />
                  </Col>
                  <Col span={24} md={{ span: 12 }}>
                    <CInput
                      name='manufacturingYear'
                      type='number'
                      label='Manufacturing Year'
                    />
                  </Col>
                  <Col span={24} md={{ span: 12 }}>
                    <CInput
                      name='registrationPlate'
                      type='text'
                      label='Registration Plate'
                    />
                  </Col>

                  <Col span={24} md={{ span: 12 }}>
                    <Form.Item label='Selected Time'>
                      <TimePicker.RangePicker
                        size='large'
                        style={{
                          width: '100%',
                          fontWeight: 'bold',
                          backgroundColor: '#e0e0e0',
                          color: '#000',
                          opacity: 1
                        }}
                        disabled
                        format={'HH:mm'}
                        defaultValue={[
                          dayjs(slotData?.data?.startTime, 'HH:mm'),
                          dayjs(slotData?.data?.endTime, 'HH:mm')
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Button
                  htmlType='submit'
                  style={{
                    width: '100%',
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: 600,
                    padding: '20px 0px',
                    borderRadius: '0.375rem',
                    backgroundColor: '#418FC8',
                    color: 'white',
                    outline: 'none',
                    marginTop: '0.25rem',
                    marginBottom: '0.25rem'
                  }}>
                  Pay Now
                </Button>
              </CForm>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BookingPage
