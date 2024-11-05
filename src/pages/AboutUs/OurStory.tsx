import { motion } from 'framer-motion'
import { aboutUs } from '../../assets/images'

const OurStorySection = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <motion.section
      className='container mx-auto px-4 py-20 bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl shadow-lg overflow-hidden relative'
      initial='hidden'
      animate='visible'
      variants={fadeInUp}>
      {/* Background overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-primary-200 to-transparent opacity-20'></div>

      <div className='relative z-10 flex flex-col md:flex-row items-center gap-10'>
        {/* Text Section */}
        <div className='md:w-1/2 space-y-6'>
          <h2 className='text-4xl font-bold text-primary-800 mb-6'>
            Our Story
          </h2>
          <p className='text-lg text-gray-700 leading-relaxed'>
            Founded in 2010, CleanCarz began with a simple idea: to provide car
            owners with a superior cleaning experience. Our journey started in a
            small garage and has since grown into a network of state-of-the-art
            facilities across the country.
          </p>
          <p className='text-lg text-gray-700 leading-relaxed'>
            We’ve washed over 1 million cars, but our commitment to quality and
            customer satisfaction remains as strong as on day one. At CleanCarz,
            we’re not just cleaning cars; we’re crafting experiences and
            building relationships.
          </p>
        </div>

        {/* Image Section */}
        <div className='md:w-1/2 relative flex justify-center'>
          <div className='relative transform hover:scale-105 transition-transform duration-500 ease-out'>
            <img
              src={aboutUs}
              alt='CleanCarz facility'
              className='rounded-lg shadow-xl'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-40 rounded-lg'></div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default OurStorySection
