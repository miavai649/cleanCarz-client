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
    <div className='flex-1 bg-white rounded-lg shadow-xl p-4 md:p-6'>
      <h2 className='text-xl font-semibold text-primary-600 mb-4'>
        Selected Service
      </h2>
      <div className='border border-gray-200 rounded-lg p-4'>
        <img
          src={serviceData?.image}
          alt='Service'
          className='w-full h-40 object-cover rounded-md'
        />
        <h3 className='text-lg font-semibold text-gray-800 mt-2'>
          {serviceData?.name}
        </h3>
        <p className='text-gray-600 mt-2'>{serviceData?.description}</p>
        <p className='text-primary-600 text-lg font-bold mt-2'>
          {' '}
          ৳{serviceData?.price}
        </p>
        <p className='text-gray-500 mt-1'>
          Duration: {serviceData?.duration} Minutes
        </p>
      </div>

      <div className='mt-6'>
        <h2 className='text-xl font-semibold text-primary-600 mb-4'>
          Selected Time Slot
        </h2>
        <div className='border border-gray-200 rounded-lg p-4'>
          <p className='text-gray-600'>Date: {slotData?.date}</p>
          <p className='text-gray-600'>
            Time: {slotData?.startTime} - {slotData?.endTime}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SelectedServiceAndSlot
