import React from 'react'
import { FaCar, FaLeaf, FaSprayCan } from 'react-icons/fa6'
import ServiceWeProvideCard from '../../components/cards/ServiceWeProvideCard'
import { motion } from 'framer-motion'
import { Typography } from 'antd'
const { Title } = Typography

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

const ServiceWeProvide: React.FC = () => {
  return (
    <div className='container mx-auto px-4 py-12'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center mb-12'>
        <h2 className='text-2xl md:text-4xl font-extrabold text-gray-800 mb-4'>
          Services We Provide
        </h2>
        <p className='text-gray-600 text-base md:text-lg'>
          Experience the best car care with our range of premium services
          designed to keep your vehicle in top condition.
        </p>
        <div className='mt-2 w-16 md:w-24 mx-auto h-1 bg-primary-800 rounded'></div>
      </motion.div>
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
