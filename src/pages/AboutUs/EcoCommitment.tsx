import { motion } from 'framer-motion'
import SectionHeader from '../../components/ui/SectionHeader'
import { FaLeaf, FaRecycle, FaSprayCan } from 'react-icons/fa'

const headingProps = {
  heading: 'Our Eco Commitment',
  description:
    'Committed to a cleaner car and a greener planet with eco-friendly practices and sustainable solutions.'
}

const EcoCommitment = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }
  return (
    <motion.section
      className='container mx-auto px-4 py-12'
      variants={fadeInUp}>
      <SectionHeader props={headingProps} />
      <div className='bg-primary-50 p-8 rounded-lg shadow-xl'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='text-center'>
            <FaLeaf className='text-6xl text-secondary-500 mx-auto mb-4' />
            <h3 className='text-2xl font-semibold mb-2 text-primary-600'>
              95% Water Recycled
            </h3>
            <p className='text-gray-600'>
              Our Aqua Reborn System ensures minimal water waste.
            </p>
          </div>
          <div className='text-center'>
            <FaSprayCan className='text-6xl text-secondary-500 mx-auto mb-4' />
            <h3 className='text-2xl font-semibold mb-2 text-primary-600'>
              Biodegradable Products
            </h3>
            <p className='text-gray-600'>
              All our cleaning solutions are environmentally friendly.
            </p>
          </div>
          <div className='text-center'>
            <FaRecycle className='text-6xl text-secondary-500 mx-auto mb-4' />
            <h3 className='text-2xl font-semibold  mb-2 text-primary-600'>
              Zero Waste Initiative
            </h3>
            <p className='text-gray-600'>
              We're committed to recycling and reducing our carbon footprint.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default EcoCommitment
