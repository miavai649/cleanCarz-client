import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import {
  FaCarSide,
  FaSprayCan,
  FaUserFriends,
  FaLeaf,
  FaAward,
  FaRecycle,
  FaClock,
  FaTrophy,
  FaHandshake,
  FaChartLine,
  FaTint
} from 'react-icons/fa'
import { aboutUs } from '../../assets/images'
import EvolutionSection from './EvolutionSection'
import InnovationHub from './InnovationHub'
import WhyChooseCleanCarz from './WhyChooseCleanCarz'
import BehindTheScenes from './BehindTheScenes'

const AboutUs: React.FC = () => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <motion.section
        className='text-center container mx-auto px-4 py-16'
        variants={fadeInUp}>
        <h1 className='text-5xl font-bold text-primary-700 mb-4'>
          Welcome to CleanCarz
        </h1>
        <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
          Where passion for cars meets the art of cleanliness. Discover the
          CleanCarz difference.
        </p>
      </motion.section>

      {/* Our Story Section */}
      <motion.section
        className='container mx-auto px-4 py-16 bg-gradient-to-r from-blue-50 via-white to-blue-50 rounded-lg shadow-md'
        variants={fadeInUp}>
        <h2 className='text-4xl font-bold text-primary-700 mb-10 text-center'>
          Our Story
        </h2>
        <div className='flex flex-col md:flex-row items-center gap-10'>
          <div className='md:w-1/2 space-y-6'>
            <p className='text-lg text-gray-800 leading-relaxed'>
              Founded in 2010, CleanCarz began with a simple idea: to provide
              car owners with a superior cleaning experience. Our journey
              started in a small garage and has since grown into a network of
              state-of-the-art facilities across the country.
            </p>
            <p className='text-lg text-gray-800 leading-relaxed'>
              We've washed over 1 million cars, but our commitment to quality
              and customer satisfaction remains as strong as day one. At
              CleanCarz, we're not just cleaning cars; we're crafting
              experiences and building relationships.
            </p>
          </div>
          <div className='md:w-1/2'>
            <img
              src={aboutUs}
              alt='CleanCarz facility'
              className='rounded-lg shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500'
            />
          </div>
        </div>
      </motion.section>

      <motion.div
        className='container mx-auto px-4 py-16'
        initial='hidden'
        animate={controls}
        variants={staggerChildren}
        ref={ref}>
        {/* evolution section */}
        <EvolutionSection />

        {/* innovation hub section */}
        <InnovationHub />

        {/* why choose cleanCarz */}
        <WhyChooseCleanCarz />

        {/* Behind the Scenes */}
        <BehindTheScenes />

        {/* Our Eco Commitment */}
        <motion.section className='mb-20' variants={fadeInUp}>
          <h2 className='text-4xl font-bold mb-6 text-primary-700'>
            Our Eco Commitment
          </h2>
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
                  We're committed to recycling and reducing our carbon
                  footprint.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Join the CleanCarz Revolution */}
        <motion.section variants={fadeInUp}>
          <div className='bg-primary-50 p-12 rounded-lg shadow-2xl'>
            <h2 className='text-4xl font-bold mb-4 text-primary-700'>
              Join the CleanCarz Revolution
            </h2>
            <p className='text-xl mb-8 text-gray-600'>
              Experience the future of car care. Your vehicle deserves nothing
              less.
            </p>
            <motion.button
              className='bg-secondary-500 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              Schedule Your Premium Wash
            </motion.button>
          </div>
        </motion.section>
      </motion.div>
    </div>
  )
}

export default AboutUs
