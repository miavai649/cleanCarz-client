import { Table, TableColumnsType } from 'antd'
import { useGetAllBookingQuery } from '../../redux/features/booking/bookingApi'
import formateVehicleType from '../../utils/formateVehicleType'

export type TTableData = {
  key: string
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceName: string
  slotDate: string
  slotStartTime: string
  slotEndTime: string
  vehicleType: string
  vehicleModel: string
  vehicleBrand: string
  registrationPlate: string
}

const Booking = () => {
  const { data: bookingData, isLoading: bookingLoading } =
    useGetAllBookingQuery({})

  // Transform booking data for the table
  const tableData = bookingData?.data?.map((booking) => ({
    key: booking._id,
    customerName: booking.customer.name,
    customerEmail: booking.customer.email,
    customerPhone: booking.customer.phone,
    serviceName: booking.service.name,
    slotDate: booking.slot.date,
    slotStartTime: booking.slot.startTime,
    slotEndTime: booking.slot.endTime,
    vehicleType: booking.vehicleType,
    vehicleModel: booking.vehicleModel,
    vehicleBrand: booking.vehicleBrand,
    registrationPlate: booking.registrationPlate
  }))

  // Table columns
  const columns: TableColumnsType<TTableData> = [
    {
      key: 'customerName',
      title: 'Customer Name',
      dataIndex: 'customerName'
    },
    {
      key: 'customerEmail',
      title: 'Email',
      dataIndex: 'customerEmail',
      align: 'center'
    },
    {
      key: 'customerPhone',
      title: 'Phone No.',
      dataIndex: 'customerPhone',
      align: 'center'
    },
    {
      key: 'serviceName',
      title: 'Service',
      dataIndex: 'serviceName',
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
      key: 'vehicleType',
      title: 'Vehicle Type',
      dataIndex: 'vehicleType',
      align: 'center',
      render: (item) => formateVehicleType(item)
    },
    {
      key: 'vehicleModel',
      title: 'Vehicle Model',
      dataIndex: 'vehicleModel',
      align: 'center'
    },
    {
      key: 'vehicleBrand',
      title: 'Vehicle Brand',
      dataIndex: 'vehicleBrand',
      align: 'center'
    },
    {
      key: 'registrationPlate',
      title: 'Registration Plate',
      dataIndex: 'registrationPlate',
      align: 'center'
    }
  ]

  return (
    <div>
      <div className='flex justify-between w-full'>
        <h1 className='text-2xl mb-6 font-bold'>Booking Management</h1>
      </div>
      <Table
        loading={bookingLoading}
        scroll={{ x: 1300 }}
        style={{ scrollBehavior: 'auto' }}
        columns={columns}
        dataSource={tableData}
        rowKey='key'
      />
    </div>
  )
}

export default Booking
