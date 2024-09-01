import { TService, TSlot } from '../../types'

type TSelectedServiceAndSlotProps = {
  serviceData: TService
  slotData: TSlot
}

const SelectedServiceAndSlot = ({
  serviceData,
  slotData
}: TSelectedServiceAndSlotProps) => {
  return (
    <div className='flex-1 bg-white rounded-lg shadow-xl p-6 md:p-8'>
      <h2 className='text-2xl font-bold text-primary-600 mb-6 text-center'>
        Selected Service
      </h2>
      <div className='border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg'>
        <img
          src={serviceData?.image}
          alt='Service'
          className='w-full h-48 object-cover rounded-md mb-4 hover:scale-105 transition-transform duration-300'
        />
        <h3 className='text-2xl font-semibold text-gray-800 mt-2'>
          {serviceData?.name}
        </h3>
        <p className='text-gray-600 mt-2 leading-relaxed'>
          {serviceData?.description}
        </p>
        <p className='text-primary-600 text-xl font-bold mt-4'>
          ৳{serviceData?.price}
        </p>
        <p className='text-gray-500 mt-1 text-sm'>
          Duration: {serviceData?.duration} Minutes
        </p>
      </div>

      <div className='mt-8'>
        <h2 className='text-2xl font-bold text-primary-600 mb-6 text-center'>
          Selected Time Slot
        </h2>
        <div className='border border-gray-200 rounded-lg p-6 bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg'>
          <p className='text-gray-600 text-lg font-medium'>
            Date: <span className='font-bold'>{slotData?.date}</span>
          </p>
          <p className='text-gray-600 text-lg font-medium mt-2'>
            Time: <span className='font-bold'>{slotData?.startTime}</span> -{' '}
            <span className='font-bold'>{slotData?.endTime}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SelectedServiceAndSlot
