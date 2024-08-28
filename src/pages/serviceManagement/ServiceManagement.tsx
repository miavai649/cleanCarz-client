import {
  Button,
  Form,
  Input,
  Modal,
  Space,
  Table,
  TableColumnsType
} from 'antd'
import { Link } from 'react-router-dom'
import AddServiceModal from '../../components/modal/AddServiceModal'

interface TServiceData {
  _id: string
  name: string
  description: string
  price: number
  duration: number
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

const ServiceManagement = () => {
  // Dummy data
  const serviceData: TServiceData[] = [
    {
      _id: '60d9c4e4f3b4b544b8b8d1c5',
      name: 'Car Wash',
      description: 'Professional car washing service',
      price: 50,
      duration: 60,
      isDeleted: false,
      createdAt: '2024-06-15T12:00:00Z',
      updatedAt: '2024-06-15T12:00:00Z'
    },
    {
      _id: '60d9c4e4f3b4b544b8b8d1c6',
      name: 'Interior Cleaning',
      description: 'Comprehensive interior cleaning',
      price: 75,
      duration: 90,
      isDeleted: false,
      createdAt: '2024-06-16T12:00:00Z',
      updatedAt: '2024-06-16T12:00:00Z'
    },
    {
      _id: '60d9c4e4f3b4b544b8b8d1c7',
      name: 'Engine Detailing',
      description: 'Engine cleaning and detailing',
      price: 100,
      duration: 120,
      isDeleted: false,
      createdAt: '2024-06-17T12:00:00Z',
      updatedAt: '2024-06-17T12:00:00Z'
    }
  ]

  // Table columns
  const columns: TableColumnsType<TServiceData> = [
    {
      key: 'name',
      title: 'Service Name',
      dataIndex: 'name'
    },
    {
      key: 'price',
      title: 'Price ($)',
      dataIndex: 'price'
    },
    {
      key: 'duration',
      title: 'Duration (min)',
      dataIndex: 'duration'
    },
    {
      key: 'action',
      title: 'Action',
      render: (item) => (
        <Space>
          <Link to={`/admin/service-details/${item._id}`}>
            <Button>Details</Button>
          </Link>
          <Button>Update</Button>
          <Button danger>Delete</Button>
        </Space>
      ),
      width: '1%'
    }
  ]

  return (
    <div>
      <div className='flex justify-between w-full'>
        <h1 className='text-2xl mb-6 font-bold'>Service Management</h1>
        <AddServiceModal />
      </div>
      <Table
        scroll={{ x: 1300 }}
        style={{ scrollBehavior: 'auto' }}
        columns={columns}
        dataSource={serviceData}
        rowKey='_id'
        pagination={false}
      />
    </div>
  )
}

export default ServiceManagement
