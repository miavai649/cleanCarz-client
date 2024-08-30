import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Radio, RadioChangeEvent, Select, Space } from 'antd'
import { useState } from 'react'

type TFilterCardProps = {
  capacity: number
  setCapacity: (value: number) => void
  onChange: (e: RadioChangeEvent) => void
  sortOrder: string
}

const FilterCard = ({
  capacity,
  setCapacity,
  onChange,
  sortOrder
}: TFilterCardProps) => {
  const [selectedOption, setSelectedOption] = useState({
    value: capacity,
    label: `${capacity} Minutes`
  })

  const decreaseCapacity = () => {
    const newCapacity = capacity - 1
    setCapacity(newCapacity)
    setSelectedOption({
      value: newCapacity,
      label: `${newCapacity} Minutes`
    })
  }

  const increaseCapacity = () => {
    const newCapacity = capacity + 1
    setCapacity(newCapacity)
    setSelectedOption({
      value: newCapacity,
      label: `${newCapacity} Minutes`
    })
  }

  const handleSelectChange = (option: { value: number; label: string }) => {
    setCapacity(option.value)
    setSelectedOption(option)
  }

  return (
    <div className='hidden lg:flex'>
      <div className='lg:w-80 md:w-80 border shadow-lg p-5 rounded-lg mx-auto bg-white '>
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
            Filter by duration ({capacity} minutes)
          </p>
          <div className='flex items-center gap-2 mt-4'>
            <Button
              className='bg-gray-200 hover:bg-gray-300 rounded-lg transition-all'
              style={{ height: '50px', width: '50px' }}
              onClick={decreaseCapacity}>
              -
            </Button>
            <Select
              value={selectedOption}
              style={{
                width: '100px',
                flex: 1,
                textAlign: 'center',
                height: '50px',
                borderRadius: '10px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              labelInValue
              onChange={handleSelectChange}
              options={Array.from({ length: 6 }, (_, i) => ({
                value: (i + 1) * 10,
                label: `${(i + 1) * 10} Minutes`
              }))}
            />
            <Button
              className='bg-gray-200 hover:bg-gray-300 rounded-lg transition-all'
              style={{ height: '50px', width: '50px' }}
              onClick={increaseCapacity}>
              +
            </Button>
          </div>
        </div>

        <div className='pt-7'>
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
  )
}

export default FilterCard
