import moment from 'moment'
import { useGetMyBookingQuery } from '../../redux/features/booking/bookingApi'
import {
  Card,
  Col,
  Row,
  Statistic,
  Table,
  TableColumnsType,
  Typography
} from 'antd'
import Spinner from '../../components/spinner/Spinner'
import { MdErrorOutline } from 'react-icons/md'

export type TTableData = {
  key: string
  serviceName: string
  servicePrice: number
  slotDate: string
  slotStartTime: string
  slotEndTime: string
  vehicleModel: string
  vehicleBrand: string
  registrationPlate: string
  manufacturingYear: number
}

const { Countdown } = Statistic
const { Text, Title } = Typography

const MyBooking = () => {
  const { data: myBookingData, isLoading: myBookingLoading } =
    useGetMyBookingQuery({})

  const today = moment().format('YYYY-MM-DD')

  // filter the past bookings
  const pastBookings = myBookingData?.data?.filter((booking) =>
    moment(booking.slot.date).isBefore(today)
  )

  // filter the upcoming bookings
  const upcomingBookings = myBookingData?.data?.filter((booking) =>
    moment(booking.slot.date).isSameOrAfter(today)
  )

  // Function to get the deadline for countdown
  const getCountdownValue = (date: string, startTime: string) => {
    return moment(`${date} ${startTime}`).toDate().getTime()
  }

  // table data
  const tableData = pastBookings?.map((booking) => ({
    key: booking._id,
    serviceName: booking.service.name,
    servicePrice: booking.service.price,
    slotDate: booking.slot.date,
    slotStartTime: booking.slot.startTime,
    slotEndTime: booking.slot.endTime,
    vehicleModel: booking.vehicleModel,
    vehicleBrand: booking.vehicleBrand,
    registrationPlate: booking.registrationPlate,
    manufacturingYear: booking.manufacturingYear
  }))

  // Table columns
  const columns: TableColumnsType<TTableData> = [
    {
      key: 'serviceName',
      title: 'Service',
      dataIndex: 'serviceName'
    },
    {
      key: 'servicePrice',
      title: 'Price (৳)',
      dataIndex: 'servicePrice',
      align: 'center'
    },
    {
      key: 'slotDate',
      title: 'Date',
      dataIndex: 'slotDate',
      align: 'center'
    },
    {
      key: 'slotStartTime',
      title: 'Start Time',
      dataIndex: 'slotStartTime',
      align: 'center'
    },
    {
      key: 'slotEndTime',
      title: 'End Time',
      dataIndex: 'slotEndTime',
      align: 'center'
    },
    {
      key: 'vehicleBrand',
      title: 'Vehicle Brand',
      dataIndex: 'vehicleBrand',
      align: 'center'
    },
    {
      key: 'vehicleModel',
      title: 'Vehicle Model',
      dataIndex: 'vehicleModel',
      align: 'center'
    },

    {
      key: 'registrationPlate',
      title: 'Registration Plate',
      dataIndex: 'registrationPlate',
      align: 'center'
    },
    {
      key: 'manufacturingYear',
      title: 'Manufacturing Year',
      dataIndex: 'manufacturingYear',
      align: 'center'
    }
  ]

  if (myBookingLoading) {
    return <Spinner />
  }

  return (
    <div>
      <div className='flex justify-between w-full'>
        <h1 className='text-2xl mb-6 font-bold'>Upcoming Bookings</h1>
      </div>
      <div>
        {upcomingBookings?.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16'>
            <MdErrorOutline className='text-red-500 mb-4' size={48} />
            <p className='text-lg font-semibold text-gray-800'>
              No Upcoming Bookings
            </p>
            <p className='text-sm text-gray-600 mt-1'>
              Please book a slot for your car wash service.
            </p>
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {upcomingBookings?.map((booking) => (
              <Col span={8} key={booking._id}>
                <Card
                  title={<Title level={4}>{booking.service.name}</Title>}
                  bordered={false}
                  style={{
                    borderRadius: '12px',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
                    padding: '24px',
                    backgroundColor: '#ffffff'
                  }}>
                  <Text strong>Price: </Text>৳{booking.service.price}
                  <br />
                  <Text strong>Date: </Text>
                  {booking.slot.date}
                  <br />
                  <Text strong>Start Time: </Text>
                  {booking.slot.startTime}
                  <br />
                  <Text strong>End Time: </Text>
                  {booking.slot.endTime}
                  <br />
                  <Text strong>Vehicle Model: </Text>
                  {booking.vehicleModel}
                  <br />
                  <Text strong>Vehicle Brand: </Text>
                  {booking.vehicleBrand}
                  <br />
                  <Text strong>Registration Plate: </Text>
                  {booking.registrationPlate}
                  <br />
                  <Text strong>Manufacturing Year: </Text>
                  {booking.manufacturingYear}
                  <br />
                  <div style={{ marginTop: '24px' }}>
                    <Countdown
                      title={<Text strong>Time Until Your Car Wash</Text>}
                      value={getCountdownValue(
                        booking.slot.date,
                        booking.slot.startTime
                      )}
                      format='HH:mm:ss'
                      onFinish={() =>
                        console.log(`Booking ${booking._id} has started`)
                      }
                      className='text-lg font-semibold'
                    />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
      <div className='flex justify-between w-full pt-12'>
        <h1 className='text-2xl mb-6 font-bold'>Booking History</h1>
      </div>
      <Table
        loading={myBookingLoading}
        scroll={{ x: 1300 }}
        style={{ scrollBehavior: 'auto' }}
        columns={columns}
        dataSource={tableData}
        rowKey='key'
      />
    </div>
  )
}

export default MyBooking
