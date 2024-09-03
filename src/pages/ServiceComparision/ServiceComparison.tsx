import { Button, Table, Empty, Select } from 'antd'
import { useState } from 'react'
import { useGetAllServiceQuery } from '../../redux/features/service/serviceApi'

const { Option } = Select

interface Service {
  _id: string
  name: string
  description: string
  price: number
  duration: number
}

interface ServiceComparisonColumn {
  title: string
  dataIndex: keyof Service
  key: string
  render?: (text: string | number) => JSX.Element | string
}

const ServiceComparison = () => {
  const [selectedServices, setSelectedServices] = useState<Service[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const { data: serviceData, isLoading } = useGetAllServiceQuery({})
  const services = serviceData?.data || []

  const handleSelectChange = (keys: string[]) => {
    setSelectedKeys(keys)
    const selected = services.filter((service) => keys.includes(service._id))
    setSelectedServices(selected)
  }

  const handleClearComparison = () => {
    setSelectedServices([])
    setSelectedKeys([])
  }

  const columns: ServiceComparisonColumn[] = [
    {
      title: 'Service',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text: string | number) =>
        typeof text === 'string'
          ? text.length > 100
            ? `${text.slice(0, 100)}...`
            : text
          : text.toString()
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: string | number) =>
        typeof text === 'number' ? `৳${text}` : `৳${text}`
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (text: string | number) =>
        typeof text === 'number' ? `${text} mins` : `${text} mins`
    }
  ]

  return (
    <div className='container mx-auto py-12'>
      {/* header */}
      <div className='text-center mb-12'>
        <h2 className='text-4xl font-extrabold text-gray-800 mb-4'>
          Compare Our Car Wash Services
        </h2>
        <p className='text-gray-600 text-lg'>
          Select and compare different car wash services to find the perfect fit
          for your needs.
        </p>
        <div className='mt-2 w-24 mx-auto h-1 bg-primary-800 rounded'></div>
      </div>

      {/* service selection  */}
      <div className='mb-4'>
        <label
          htmlFor='serviceSelect'
          className='block text-lg font-medium text-gray-700 mb-2'>
          Choose Services to Compare
        </label>
        <Select
          id='serviceSelect'
          size='large'
          disabled={isLoading}
          mode='multiple'
          placeholder='Select services to compare'
          style={{ width: '100%', marginBottom: '24px' }}
          value={selectedKeys}
          onChange={handleSelectChange}
          optionLabelProp='label'>
          {services.map((service) => (
            <Option key={service._id} value={service._id} label={service.name}>
              {service.name}
            </Option>
          ))}
        </Select>
      </div>

      {/* comparison table */}
      {selectedServices.length > 1 ? (
        <div className='comparison-table mt-12'>
          <Table
            dataSource={selectedServices}
            columns={columns}
            pagination={false}
            bordered
            rowKey='_id'
          />
          <Button
            type='primary'
            danger
            className='mt-6'
            onClick={handleClearComparison}>
            Clear
          </Button>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-16'>
          <Empty
            description={
              <span>
                Select at least <strong>two services</strong> to compare.
              </span>
            }
          />
        </div>
      )}
    </div>
  )
}

export default ServiceComparison
