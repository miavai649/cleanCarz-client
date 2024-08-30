import { Button, Modal, Space, Table, TableColumnsType } from 'antd'
import { Link } from 'react-router-dom'
import AddServiceModal from '../../components/modal/AddServiceModal'
import UpdateServiceModal from '../../components/modal/UpdateServiceModal'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useGetAllServiceQuery } from '../../redux/features/service/serviceApi'

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
  const { confirm } = Modal

  const showPromiseConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this service?',
      icon: <ExclamationCircleFilled />,
      content:
        'This action cannot be undone. The service will be permanently removed.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        console.log('Service deleted')
      },
      onCancel() {
        console.log('Deletion canceled')
      }
    })
  }

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

  const { data: servicesData } = useGetAllServiceQuery({})
  console.log('🚀 ~ ServiceManagement ~ servicesData:', servicesData)

  // Table columns
  const columns: TableColumnsType<TServiceData> = [
    {
      key: 'name',
      title: 'Service Name',
      align: 'center',
      dataIndex: 'name'
    },
    {
      key: 'price',
      title: 'Price ($)',
      align: 'center',
      dataIndex: 'price'
    },
    {
      key: 'duration',
      title: 'Duration (min)',
      align: 'center',
      dataIndex: 'duration'
    },
    {
      key: 'action',
      title: 'Action',
      align: 'center',
      render: (item) => (
        <Space>
          <Link to={`/admin/service-details/${item._id}`}>
            <Button>Details</Button>
          </Link>
          <UpdateServiceModal />
          <Button danger onClick={showPromiseConfirm}>
            Delete
          </Button>
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
