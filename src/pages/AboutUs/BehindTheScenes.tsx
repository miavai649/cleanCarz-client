import { motion } from 'framer-motion'
import SectionHeader from '../../components/ui/SectionHeader'

const headingProps = {
  heading: 'Behind the Scenes: The CleanCarz Experience',
  description:
    'Discover how our car wash services have evolved to set new standards in quality, efficiency, and customer satisfaction over the years.'
}

const BehindTheScenes = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <motion.section
      className='container mx-auto px-4 py-16 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-2xl'
      initial='hidden'
      animate='visible'
      variants={fadeInUp}>
      {/* Section Header */}
      <SectionHeader props={headingProps} />

      {/* Content */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
        {/* Video Container */}
        <div className='relative rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-500'>
          <iframe
            src='https://www.youtube.com/embed/eMBlkjCA298?autoplay=1&mute=1&loop=1&playlist=eMBlkjCA298'
            frameBorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            className='w-full h-[300px] md:h-[400px] lg:h-[450px]'></iframe>
          <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent'></div>
        </div>

        {/* Text and Button Section */}
        <div className='flex flex-col items-start space-y-4'>
          <h3 className='text-3xl font-bold text-primary-700 leading-snug mb-4'>
            Witness the Magic Unfold
          </h3>
          <p className='text-gray-700 leading-relaxed text-lg'>
            Journey through our state-of-the-art facility and witness firsthand
            the meticulous process that transforms your vehicle. Every step is
            designed to deliver unmatched quality and care.
          </p>

          {/* Action Button */}
          <motion.button
            className='bg-gradient-to-r from-secondary-500 to-red-600 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg mt-6'
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}>
            Book Your Experience
          </motion.button>
        </div>
      </div>
    </motion.section>
  )
}

export default BehindTheScenes
