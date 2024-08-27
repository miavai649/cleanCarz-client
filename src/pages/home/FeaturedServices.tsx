import { image } from '../../assets/images'
import FeatureCard from '../../components/cards/FeatureCard'

const services = [
  {
    id: 1,
    title: 'Full Exterior Wash',
    description: 'A thorough exterior wash to make your car shine.',
    image: image // Replace with actual image
  },
  {
    id: 2,
    title: 'Interior Detailing',
    description: 'Detailed interior cleaning for a spotless cabin.',
    image: image // Replace with actual image
  },
  {
    id: 3,
    title: 'Wax and Polish',
    description: 'Enhance your car’s shine and protect the paint with wax.',
    image: image // Replace with actual image
  },
  {
    id: 4,
    title: 'Tire and Wheel Cleaning',
    description: 'Deep clean your tires and wheels for a fresh look.',
    image: image // Replace with actual image
  },
  {
    id: 5,
    title: 'Engine Cleaning',
    description: 'Professional engine cleaning to keep it running smoothly.',
    image: image // Replace with actual image
  },
  {
    id: 6,
    title: 'Full Package',
    description: 'A complete package for interior and exterior cleaning.',
    image: image // Replace with actual image
  }
]

const FeaturedServices = () => {
  return (
    <div className='container mx-auto py-12'>
      {/* Header */}
      <div className='text-center mb-12'>
        <h2 className='text-4xl font-extrabold text-gray-800 mb-4'>
          Featured Services
        </h2>
        <p className='text-gray-600 text-lg'>
          Explore our most popular car wash packages
        </p>
        <div className='mt-2 w-24 mx-auto h-1 bg-primary-800 rounded'></div>
      </div>

      {/* Services Grid */}
      <div className='flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service) => (
            <FeatureCard service={service} key={service.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default FeaturedServices
