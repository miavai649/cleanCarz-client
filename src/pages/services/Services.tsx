import { SearchOutlined } from '@ant-design/icons'
import { Input, Radio, RadioChangeEvent, Space } from 'antd'
import { useEffect, useState } from 'react'
import { FiFilter } from 'react-icons/fi'
import FilterCard from '../../components/cards/FilterCard'
import { useGetAllServiceQuery } from '../../redux/features/service/serviceApi'
import Spinner from '../../components/spinner/Spinner'
import ServiceCard from '../../components/cards/ServiceCard'

const Services = () => {
  const [sortOrder, setSortOrder] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [duration, setDuration] = useState(0)
  const [debouncedDuration, setDebouncedDuration] = useState(0)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      setDebouncedDuration(duration)
    }, 1500)

    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm, duration])

  // getting services data
  const { data: serviceData, isLoading } = useGetAllServiceQuery({
    duration: debouncedDuration,
    searchTerm: debouncedSearchTerm,
    sortOrder
  })

  const handleClearFilter = () => {
    setSearchTerm('')
    setDuration(0)
    setSortOrder('')
  }

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

  /**
   * if isLoading true then it will show Spinner
   * if the data array is empty then it will show "no service available"
   * if the data array is not empty then it will show data
   */

  if (isLoading) {
    content = <Spinner />
  } else if (!serviceData?.data?.length) {
    content = (
      <div className='flex justify-center items-center h-96'>
        <p className='text-xl font-semibold text-gray-500'>
          No service available
        </p>
      </div>
    )
  } else {
    content = (
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {serviceData?.data?.map((service) => (
          <ServiceCard key={service?._id} service={service} />
        ))}
      </div>
    )
  }

  return (
    <div className='container mx-auto py-12'>
      {/* header */}
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
          duration={duration}
          setDuration={setDuration}
          onChange={onChange}
          sortOrder={sortOrder}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          handleClearFilter={handleClearFilter}
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
                <button
                  onClick={handleClearFilter}
                  className='bg-secondary-500 hover:bg-secondary-600 px-3 py-2 rounded-lg text-white font-semibold shadow-md'>
                  Clear Filters
                </button>
              </div>

              {/* filter by duration */}
              <div className='pt-7'>
                <p className='text-sm font-semibold'>Filter with duration</p>
                <input
                  type='range'
                  min={0}
                  max={100}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className='outline-none w-full mt-2'
                />
                <div className='flex items-center justify-between text-sm'>
                  <p>{duration} min</p>
                  <p>100 min</p>
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

        {/* services section */}
        <div className='flex-1 rounded-md mx-auto'>{content}</div>
      </div>
    </div>
  )
}

export default Services
