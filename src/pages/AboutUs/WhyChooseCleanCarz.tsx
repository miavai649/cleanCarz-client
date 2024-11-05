import { motion } from 'framer-motion'
import SectionHeader from '../../components/ui/SectionHeader'
import { FaChartLine, FaHandshake, FaLeaf, FaTrophy } from 'react-icons/fa'

const headingProps = {
  heading: 'Why Choose CleanCarz?',
  description:
    'Experience unmatched quality, speed, and customer care with CleanCarz.'
}

const WhyChooseCleanCarz = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }
  return (
    <motion.section
      className='container mx-auto px-4 py-12'
      variants={fadeInUp}>
      <SectionHeader props={headingProps} />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
        {[
          {
            icon: <FaTrophy />,
            title: 'Award-Winning Service',
            description:
              'Recognized for excellence in customer satisfaction and innovative techniques.'
          },
          {
            icon: <FaLeaf />,
            title: 'Eco-Friendly Practices',
            description:
              'Committed to reducing our environmental footprint without compromising quality.'
          },
          {
            icon: <FaHandshake />,
            title: 'Customer-Centric Approach',
            description:
              'Tailored services to meet your specific needs and exceed expectations.'
          },
          {
            icon: <FaChartLine />,
            title: 'Continuous Improvement',
            description:
              'Always evolving our methods and technology to deliver the best results.'
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            className='bg-white border border-primary-200 p-6 rounded-lg shadow-lg'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <div className='text-4xl text-secondary-500 mb-4'>{item.icon}</div>
            <h3 className='text-xl font-semibold mb-2 text-primary-600'>
              {item.title}
            </h3>
            <p className='text-gray-600'>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default WhyChooseCleanCarz
