import { motion } from 'framer-motion'
import SectionHeader from '../../components/ui/SectionHeader'

const headingProps = {
  heading: 'Our Evolution',
  description:
    'Discover how our car wash services have evolved to set new standards in quality, efficiency, and customer satisfaction over the years.'
}

const EvolutionSection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <motion.section
      className='container mx-auto px-4 py-12'
      variants={fadeInUp}>
      <SectionHeader props={headingProps} />
      <div className='relative'>
        <div className='absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-300'></div>
        {[
          {
            year: 2010,
            title: 'The Spark',
            description:
              'CleanCarz ignited from a passion for pristine vehicles.'
          },
          {
            year: 2015,
            title: 'The Wave',
            description:
              'We revolutionized the industry with our eco-friendly solutions.'
          },
          {
            year: 2020,
            title: 'The Quantum Leap',
            description:
              'Launched AI-powered cleaning technology, setting new standards.'
          },
          {
            year: 2023,
            title: 'The Zenith',
            description:
              'Recognized as the pinnacle of automotive care nationwide.'
          }
        ].map((milestone, index) => (
          <motion.div
            key={index}
            className={`flex items-center mb-8 ${
              index % 2 === 0 ? 'justify-start' : 'justify-end'
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}>
            <div
              className={`w-5/12 ${
                index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'
              }`}>
              <h3 className='text-2xl font-semibold text-secondary-600'>
                {milestone.year}
              </h3>
              <h4 className='text-xl font-medium text-primary-600'>
                {milestone.title}
              </h4>
              <p className='text-gray-600'>{milestone.description}</p>
            </div>
            <div className='w-2/12 flex justify-center'>
              <div className='w-8 h-8 bg-primary-500 rounded-full border-4 border-white'></div>
            </div>
            <div className='w-5/12'></div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

export default EvolutionSection
