import { Button, Modal, Space, Table, TableColumnsType } from 'antd'
import { Link } from 'react-router-dom'
import AddServiceModal from '../../components/modal/AddServiceModal'
import UpdateServiceModal from '../../components/modal/UpdateServiceModal'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useGetAllServiceQuery } from '../../redux/features/service/serviceApi'
import { TService } from '../../types'

export type TTableData = Pick<TService, 'name' | 'price' | 'duration'>

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

  const { data: servicesData } = useGetAllServiceQuery({})

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
          <Link
            to={`/admin/service-details/${item._id}`}
            key={`${item._id}-details`}>
            <Button>Details</Button>
          </Link>
          <UpdateServiceModal key={`${item._id}-update`} />
          <Button
            key={`${item._id}-delete`}
            danger
            onClick={showPromiseConfirm}>
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
        dataSource={tableData}
        rowKey='_id'
        pagination={false}
      />
    </div>
  )
}

export default ServiceManagement
