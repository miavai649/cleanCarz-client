import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

import EvolutionSection from './EvolutionSection'
import InnovationHub from './InnovationHub'
import WhyChooseCleanCarz from './WhyChooseCleanCarz'
import BehindTheScenes from './BehindTheScenes'
import EcoCommitment from './EcoCommitment'
import OurStorySection from './OurStory'

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
      <OurStorySection />

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
        <EcoCommitment />
      </motion.div>
    </div>
  )
}

export default AboutUs
