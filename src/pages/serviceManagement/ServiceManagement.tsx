import { Button, Modal, Space, Table, TableColumnsType } from 'antd'
import { Link } from 'react-router-dom'
import AddServiceModal from '../../components/modal/AddServiceModal'
import UpdateServiceModal from '../../components/modal/UpdateServiceModal'
import { ExclamationCircleFilled } from '@ant-design/icons'
import {
  useDeleteServiceMutation,
  useGetAllServiceQuery
} from '../../redux/features/service/serviceApi'
import { TResponse, TService } from '../../types'
import { toast } from 'sonner'

export type TTableData = Pick<TService, 'name' | 'price' | 'duration'>

const ServiceManagement = () => {
  const { confirm } = Modal

  const [deleteService] = useDeleteServiceMutation()

  const handleDeleteService = async (serviceId: string) => {
    try {
      const res = (await deleteService(serviceId)) as TResponse<TService>

      if (res.error) {
        toast.error('Failed to delete service', { duration: 2000 })
      } else {
        toast.success('Service deleted successfully', { duration: 2000 })
      }
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  const showPromiseConfirm = (serviceId: string) => {
    confirm({
      title: 'Are you sure you want to delete this service?',
      icon: <ExclamationCircleFilled />,
      content:
        'This action cannot be undone. The service will be permanently removed.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => handleDeleteService(serviceId),
      onCancel() {
        toast.info('Deletion canceled', { duration: 2000 })
      }
    })
  }

  const { data: servicesData, isLoading } = useGetAllServiceQuery({})

  const tableData = servicesData?.data?.map(
    ({ _id, name, price, duration }) => ({
      key: _id,
      name,
      price,
      duration
    })
  )

  // Table columns
  const columns: TableColumnsType<TTableData> = [
    {
      key: 'name',
      title: 'Service Name',
      align: 'center',
      dataIndex: 'name'
    },
    {
      key: 'price',
      title: 'Price (৳)',
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
      render: (item) => {
        return (
          <Space key={item.key}>
            <Link
              to={`/service-details/${item.key}`}
              key={`${item.key}-details`}>
              <Button>Details</Button>
            </Link>
            <UpdateServiceModal
              key={`${item.key}-update`}
              serviceId={item?.key}
            />
            <Button
              key={`${item.key}-delete`}
              danger
              onClick={() => showPromiseConfirm(item?.key)}>
              Delete
            </Button>
          </Space>
        )
      },
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
        loading={isLoading}
        scroll={{ x: 1300 }}
        style={{ scrollBehavior: 'auto' }}
        columns={columns}
        dataSource={tableData}
        rowKey='_id'
        pagination={false}
      />
    </div>
  )
}

export default ServiceManagement
