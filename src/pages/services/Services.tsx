import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Radio, RadioChangeEvent, Select, Space } from 'antd'
import { useState } from 'react'
import { FiFilter } from 'react-icons/fi'
import FilterCard from '../../components/cards/FilterCard'
import { Link } from 'react-router-dom'
import { useGetAllServiceQuery } from '../../redux/features/service/serviceApi'
import Spinner from '../../components/spinner/Spinner'

const Services = () => {
  const [capacity, setCapacity] = useState(10)
  const [sortOrder, setSortOrder] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // getting services data
  const { data: serviceData, isLoading } = useGetAllServiceQuery(undefined)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const onChange = (e: RadioChangeEvent) => {
    setSortOrder(e.target.value)
  }

  let content

  if (isLoading) {
    content = <Spinner />
  } else {
    content = (
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {serviceData?.data?.map((service) => (
          <div
            key={service?._id}
            className='rounded-lg bg-white p-4 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col'>
            <div className='relative rounded-lg overflow-hidden'>
              <img
                src={service?.image}
                alt='Car Wash Service'
                className='w-full h-48 object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-75'></div>
              <div className='absolute bottom-4 left-4'>
                <span className='text-white text-sm font-semibold bg-primary-500 px-3 py-1 rounded-md'>
                  {service?.duration} Minutes
                </span>
              </div>
            </div>

            <div className='flex flex-col flex-grow mt-4'>
              <h2 className='text-xl font-semibold text-primary-900'>
                {service?.name}
              </h2>
              <p
                className='text-primary-700 mt-2 mb-4 flex-grow truncate overflow-hidden'
                style={{ maxHeight: '3rem' }}>
                {service?.description}
              </p>

              <div className='flex flex-col items-center mt-auto'>
                <p className='text-lg font-bold text-secondary-600 mb-2'>
                  ৳{service?.price}
                </p>
                <Link to={'/service-details'} className='w-full'>
                  <button className='w-full bg-primary-500 text-white py-2 px-4 rounded-md text-center hover:bg-primary-600 transition-colors'>
                    See Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='container mx-auto py-12'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h2 className='text-4xl font-extrabold text-gray-800 mb-4'>
          Our Premium Car Wash Services
        </h2>
        <p className='text-gray-600 text-lg'>
          Discover a range of services designed to keep your vehicle looking its
          best.
        </p>
        <div className='mt-2 w-24 mx-auto h-1 bg-primary-800 rounded'></div>
      </div>

      {/* main content section */}
      <div className='flex lg:flex-row md:flex-row flex-col items-start gap-6 my-3 pt-5'>
        {/* filter section */}
        <FilterCard
          capacity={capacity}
          setCapacity={setCapacity}
          onChange={onChange}
          sortOrder={sortOrder}
        />

        {/* Mobile Menu Button and search box */}
        <div className='lg:hidden flex justify-between items-center w-full p-2'>
          <button
            type='button'
            className='inline-flex items-center justify-center px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all duration-300 focus:outline-none shadow-lg'
            onClick={toggleSidebar}>
            <span className='mr-2 font-semibold'>Filter</span>
            <FiFilter className='h-5 w-5' />
          </button>

          <div className='flex-1 ml-4'>
            <Input
              type='search'
              prefix={
                <SearchOutlined
                  style={{ fontSize: '20px', color: '#A0AEC0' }}
                />
              }
              placeholder='Search by service or keyword'
              style={{
                height: '50px',
                borderRadius: '10px',
                paddingLeft: '15px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              className='transition-all hover:shadow-lg focus:shadow-lg focus:outline-none w-full'
            />
          </div>
        </div>

        {/* Sidebar for Mobile */}
        <div
          className={`fixed inset-0 z-50 bg-gray-800 bg-opacity-75 transition-opacity duration-300 ${
            isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={closeSidebar}>
          <div
            className={`fixed inset-y-0 right-0 w-64 bg-white p-4 transform transition-transform duration-300 ${
              isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            onClick={(e) => e.stopPropagation()}>
            <button
              type='button'
              className='text-gray-700 mb-4 focus:outline-none'
              onClick={closeSidebar}>
              <svg
                className='h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>

            <div className='space-y-6'>
              {/* Clear Filter Button */}
              <div className='flex justify-end'>
                <button className='bg-secondary-500 hover:bg-secondary-600 px-3 py-2 rounded-lg text-white font-semibold shadow-md'>
                  Clear Filters
                </button>
              </div>

              {/* Capacity Filter */}
              <div className='border border-gray-200 shadow-md p-4 rounded-lg bg-white'>
                <p className='text-base font-semibold text-gray-600'>
                  Filter by capacity ({capacity} people)
                </p>
                <div className='flex items-center gap-2 mt-4'>
                  <Button
                    className='bg-gray-200 hover:bg-gray-300 rounded-lg transition-all'
                    style={{ height: '40px', width: '40px' }}
                    // onClick={decreaseCapacity}
                  >
                    -
                  </Button>
                  <Select
                    value={capacity}
                    style={{
                      width: '80px',
                      textAlign: 'center',
                      height: '40px',
                      borderRadius: '8px',
                      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                    onChange={(value) => setCapacity(value)}
                    options={Array.from({ length: 6 }, (_, i) => ({
                      value: (i + 1) * 10,
                      label: `${(i + 1) * 10} Minute`
                    }))}
                  />
                  <Button
                    className='bg-gray-200 hover:bg-gray-300 rounded-lg transition-all'
                    style={{ height: '40px', width: '40px' }}
                    // onClick={increaseCapacity}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Sort by Price */}
              <div className='border border-gray-200 shadow-md p-4 rounded-lg bg-white'>
                <p className='text-base font-semibold text-gray-600 mb-3'>
                  Sort by price
                </p>
                <Radio.Group onChange={onChange} value={sortOrder}>
                  <Space direction='vertical'>
                    <Radio value={'ascending'}>Ascending</Radio>
                    <Radio value={'descending'}>Descending</Radio>
                  </Space>
                </Radio.Group>
              </div>
            </div>
          </div>
        </div>

        {/* products section */}
        <div className='flex-1 rounded-md mx-auto'>{content}</div>
      </div>
    </div>
  )
}

export default Services
