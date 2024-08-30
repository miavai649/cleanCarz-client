import { SearchOutlined } from '@ant-design/icons'
import { Input, Radio, RadioChangeEvent, Space } from 'antd'

type TFilterCardProps = {
  onChange: (e: RadioChangeEvent) => void
  sortOrder: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  searchTerm: string
  duration: number
  setDuration: (value: number) => void
  handleClearFilter: () => void
}

const FilterCard = ({
  onChange,
  sortOrder,
  setSearchTerm,
  searchTerm,
  duration,
  setDuration,
  handleClearFilter
}: TFilterCardProps) => {
  return (
    <div className='hidden lg:flex'>
      <div className='lg:w-80 md:w-80 border shadow-lg p-5 rounded-lg mx-auto bg-white '>
        <div className='pb-5 flex lg:flex-row md:flex-row flex-col items-center justify-between'>
          <h1 className='text-3xl font-bold text-gray-700'>Filter</h1>
          <button
            onClick={handleClearFilter}
            className='bg-secondary-500 hover:bg-secondary-600 px-4 py-2 rounded-lg text-white font-semibold shadow-md '>
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='transition-all hover:shadow-lg focus:shadow-lg focus:outline-none'
        />

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
