import { motion } from 'framer-motion'
import { FaClock, FaRecycle, FaSprayCan } from 'react-icons/fa'
import SectionHeader from '../../components/ui/SectionHeader'

const headingProps = {
  heading: 'CleanCarz Innovation Hub',
  description:
    'Discover how our car wash services have evolved to set new standards in quality, efficiency, and customer satisfaction over the years.'
}

const InnovationHub = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }
  return (
    <motion.section
      className='container mx-auto px-4 py-12'
      variants={fadeInUp}>
      <SectionHeader props={headingProps} />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {[
          {
            icon: <FaSprayCan />,
            title: 'Nano-Ceramic Shield',
            description:
              'Our proprietary coating technology provides unparalleled protection and shine.'
          },
          {
            icon: <FaRecycle />,
            title: 'Aqua Reborn System',
            description:
              'Our advanced system recycles 95% of water used, minimizing environmental impact.'
          },
          {
            icon: <FaClock />,
            title: 'Chrono Clean',
            description:
              'Experience our 15-minute express wash without compromising on quality.'
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            className='bg-primary-50 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'
            whileHover={{ scale: 1.05, rotateY: 10 }}
            whileTap={{ scale: 0.95 }}>
            <div className='text-5xl text-secondary-500 mb-4'>{item.icon}</div>
            <h3 className='text-2xl font-semibold mb-2 text-primary-700'>
              {item.title}
            </h3>
            <p className='text-gray-600'>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default InnovationHub
