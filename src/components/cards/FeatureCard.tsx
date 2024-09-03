const FeatureCard = ({ service }: any) => {
  return (
    <div className='max-w-full md:max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl'>
      <img
        className='w-full h-40 md:h-48 object-cover'
        src={service?.image}
        alt={service?.name}
      />

      <div className='p-4 md:p-6 flex flex-col h-full'>
        <h5 className='mb-2 md:mb-3 text-lg md:text-xl font-semibold text-gray-800 transition-colors hover:text-primary-500'>
          {service?.name}
        </h5>

        <p
          className='text-gray-600 mt-2 mb-4 flex-grow truncate overflow-hidden'
          style={{ maxHeight: '3rem' }}>
          {service?.description}
        </p>
      </div>
    </div>
  )
}

export default FeatureCard
