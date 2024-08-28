import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Radio, RadioChangeEvent, Select, Space } from 'antd'
import { useState } from 'react'

const Services = () => {
  const [capacity, setCapacity] = useState(10)
  const [sortOrder, setSortOrder] = useState('')
  const [value, setValue] = useState('')
  console.log('🚀 ~ Services ~ value:', value)

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value)
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
        <div className='lg:w-80 md:w-80 border shadow-lg p-5 rounded-lg mx-auto bg-white'>
          <div className='pb-5 flex lg:flex-row md:flex-row flex-col items-center justify-between'>
            <h1 className='text-3xl font-bold text-gray-700'>Filter</h1>
            <button className='bg-secondary-500 hover:bg-secondary-600 px-4 py-2 rounded-lg text-white font-semibold shadow-md '>
              Clear
            </button>
          </div>
          <Input
            type='search'
            prefix={
              <SearchOutlined style={{ fontSize: '20px', color: '#A0AEC0' }} />
            }
            placeholder='Search by service or keyword'
            style={{
              height: '50px',
              borderRadius: '10px',
              paddingLeft: '15px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            className='transition-all hover:shadow-lg focus:shadow-lg focus:outline-none'
          />

          <div className='pt-7'>
            <p className='text-base font-semibold text-gray-600'>
              Filter by capacity ({capacity} people)
            </p>
            <div className='flex items-center gap-2 mt-4'>
              <Button
                className='bg-gray-200 hover:bg-gray-300 rounded-lg transition-all'
                style={{ height: '50px', width: '50px' }}
                // onClick={decreaseCapacity}
              >
                -
              </Button>
              <Select
                value={capacity}
                style={{
                  width: '100px',
                  flex: 1,
                  textAlign: 'center',
                  height: '50px',
                  borderRadius: '10px',
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
                style={{ height: '50px', width: '50px' }}
                // onClick={increaseCapacity}
              >
                +
              </Button>
            </div>
          </div>

          <div className='pt-7'>
            <p className='text-base font-semibold text-gray-600 mb-3'>
              Sort by price
            </p>
            {/* <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <input
                  type='radio'
                  name='price'
                  value='ascending'
                  checked={sortOrder === 'ascending'}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className='form-radio text-secondary-500 focus:ring-secondary-400'
                />
                <p className='text-gray-700'>Ascending</p>
              </div>
              <div className='flex items-center gap-2'>
                <input
                  type='radio'
                  name='price'
                  value='descending'
                  checked={sortOrder === 'descending'}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className='form-radio text-secondary-500 focus:ring-secondary-400'
                />
                <p className='text-gray-700'>Descending</p>
              </div>
            </div> */}
            <Radio.Group onChange={onChange} value={value}>
              <Space direction='vertical'>
                <Radio value={'ascending'}>Ascending</Radio>
                <Radio value={'descending'}>Descending</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>

        {/* products section */}
        <div className='flex-1 rounded-md mx-auto'>
          <div className=' grid   grid-cols-1 gap-6  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            <div className='rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-90 duration-300 '>
              <div className='relative flex items-end overflow-hidden rounded-xl'>
                <img
                  src='https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                  alt='Hotel Photo'
                />
                <div className='flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600'>
                  <button className='text-sm'>Add to cart</button>
                </div>
              </div>

              <div className='mt-1 p-2'>
                <h2 className='text-slate-700'>Adobe Photoshop CC 2022</h2>
                <p className='mt-1 text-sm text-slate-400'>Lisbon, Portugal</p>

                <div className='mt-3 flex items-end justify-between'>
                  <p className='text-lg font-bold text-blue-500'>$850</p>

                  <div className='flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600'>
                    <button className='text-sm'>Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-90 duration-300 '>
              <div className='relative flex items-end overflow-hidden rounded-xl'>
                <img
                  src='https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                  alt='Hotel Photo'
                />
                <div className='flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600'>
                  <button className='text-sm'>Add to cart</button>
                </div>
              </div>

              <div className='mt-1 p-2'>
                <h2 className='text-slate-700'>Adobe Photoshop CC 2022</h2>
                <p className='mt-1 text-sm text-slate-400'>Lisbon, Portugal</p>

                <div className='mt-3 flex items-end justify-between'>
                  <p className='text-lg font-bold text-blue-500'>$850</p>

                  <div className='flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600'>
                    <button className='text-sm'>Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-90 duration-300 '>
              <div className='relative flex items-end overflow-hidden rounded-xl'>
                <img
                  src='https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                  alt='Hotel Photo'
                />
                <div className='flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600'>
                  <button className='text-sm'>Add to cart</button>
                </div>
              </div>

              <div className='mt-1 p-2'>
                <h2 className='text-slate-700'>Adobe Photoshop CC 2022</h2>
                <p className='mt-1 text-sm text-slate-400'>Lisbon, Portugal</p>

                <div className='mt-3 flex items-end justify-between'>
                  <p className='text-lg font-bold text-blue-500'>$850</p>

                  <div className='flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600'>
                    <button className='text-sm'>Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-90 duration-300 '>
              <div className='relative flex items-end overflow-hidden rounded-xl'>
                <img
                  src='https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                  alt='Hotel Photo'
                />
                <div className='flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600'>
                  <button className='text-sm'>Add to cart</button>
                </div>
              </div>

              <div className='mt-1 p-2'>
                <h2 className='text-slate-700'>Adobe Photoshop CC 2022</h2>
                <p className='mt-1 text-sm text-slate-400'>Lisbon, Portugal</p>

                <div className='mt-3 flex items-end justify-between'>
                  <p className='text-lg font-bold text-blue-500'>$850</p>

                  <div className='flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600'>
                    <button className='text-sm'>Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-90 duration-300 '>
              <div className='relative flex items-end overflow-hidden rounded-xl'>
                <img
                  src='https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                  alt='Hotel Photo'
                />
                <div className='flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600'>
                  <button className='text-sm'>Add to cart</button>
                </div>
              </div>

              <div className='mt-1 p-2'>
                <h2 className='text-slate-700'>Adobe Photoshop CC 2022</h2>
                <p className='mt-1 text-sm text-slate-400'>Lisbon, Portugal</p>

                <div className='mt-3 flex items-end justify-between'>
                  <p className='text-lg font-bold text-blue-500'>$850</p>

                  <div className='flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600'>
                    <button className='text-sm'>Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-90 duration-300 '>
              <div className='relative flex items-end overflow-hidden rounded-xl'>
                <img
                  src='https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                  alt='Hotel Photo'
                />
                <div className='flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600'>
                  <button className='text-sm'>Add to cart</button>
                </div>
              </div>

              <div className='mt-1 p-2'>
                <h2 className='text-slate-700'>Adobe Photoshop CC 2022</h2>
                <p className='mt-1 text-sm text-slate-400'>Lisbon, Portugal</p>

                <div className='mt-3 flex items-end justify-between'>
                  <p className='text-lg font-bold text-blue-500'>$850</p>

                  <div className='flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600'>
                    <button className='text-sm'>Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-90 duration-300 '>
              <div className='relative flex items-end overflow-hidden rounded-xl'>
                <img
                  src='https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                  alt='Hotel Photo'
                />
                <div className='flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600'>
                  <button className='text-sm'>Add to cart</button>
                </div>
              </div>

              <div className='mt-1 p-2'>
                <h2 className='text-slate-700'>Adobe Photoshop CC 2022</h2>
                <p className='mt-1 text-sm text-slate-400'>Lisbon, Portugal</p>

                <div className='mt-3 flex items-end justify-between'>
                  <p className='text-lg font-bold text-blue-500'>$850</p>

                  <div className='flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600'>
                    <button className='text-sm'>Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
