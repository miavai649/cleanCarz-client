const FeatureCard = ({ service }: any) => {
  return (
    <div className='max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl'>
      <a href='#'>
        <img
          className='w-full h-40 object-cover'
          src={service.image}
          alt={service.title}
        />
      </a>
      <div className='p-5'>
        <a href='#'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 transition-colors hover:text-primary-500'>
            {service.title}
          </h5>
        </a>
        <p className='mb-3 font-normal text-gray-700'>{service.description}</p>
      </div>
    </div>
  )
}

export default FeatureCard
