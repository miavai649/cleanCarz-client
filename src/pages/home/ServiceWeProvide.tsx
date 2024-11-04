import React from 'react'
import { FaCar, FaLeaf, FaSprayCan } from 'react-icons/fa6'
import ServiceWeProvideCard from '../../components/cards/ServiceWeProvideCard'
import SectionHeader from '../../components/ui/SectionHeader'

const serviceHighlights = [
  {
    id: 1,
    icon: <FaCar className='text-primary-500' />,
    headline: 'Complete Exterior Wash',
    description:
      'Our comprehensive exterior wash will make your car shine like new, using top-quality cleaning agents and techniques for a flawless finish.'
  },
  {
    id: 2,
    icon: <FaSprayCan className='text-primary-500' />,
    headline: 'Premium Interior Detailing',
    description:
      'Enjoy a spotless and fresh interior with our premium detailing service, including vacuuming, stain removal, and deep-cleaning upholstery.'
  },
  {
    id: 3,
    icon: <FaLeaf className='text-primary-500' />,
    headline: 'Eco-Friendly Products',
    description:
      'Our services use eco-friendly and biodegradable products to ensure a clean, safe wash that is gentle on your car and the environment.'
  }
]

const headingProps = {
  heading: 'Services We Provide',
  description:
    ' Experience the best car care with our range of premium services designed to keep your vehicle in top condition.'
}

const ServiceWeProvide: React.FC = () => {
  return (
    <div className='container mx-auto px-4 py-12'>
      <SectionHeader props={headingProps} />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {serviceHighlights.map((serviceHighlight) => (
          <ServiceWeProvideCard
            key={serviceHighlight.id}
            serviceHighlight={serviceHighlight}
          />
        ))}
      </div>
    </div>
  )
}

export default ServiceWeProvide
