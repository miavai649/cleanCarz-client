import { Link } from 'react-router-dom'
import { TService } from '../../types'

interface TServiceProps {
  service: TService
}

const ServiceCard = ({ service }: TServiceProps) => {
  return (
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
  )
}

export default ServiceCard
