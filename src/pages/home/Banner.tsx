import React from 'react'
import { motion } from 'framer-motion'
import { bannerVideo } from '../../assets/video'
import { Button } from 'antd'
import { RightOutlined } from '@ant-design/icons'

const Banner: React.FC = () => {
  return (
    <div className='relative h-[60vh] md:h-[70vh] overflow-hidden'>
      <video
        className='absolute top-0 left-0 w-full h-full object-cover'
        src={bannerVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex items-center'>
        <div className='container mx-auto px-4 md:px-8 lg:px-16'>
          <div className='max-w-2xl text-white space-y-6'>
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className='text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight'>
              Shine Bright,
              <br />
              Drive Happy
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className='text-lg md:text-xl font-light'>
              Experience premium car wash services tailored to your vehicle's
              needs. Quick, convenient, and professional.
            </motion.p>
            <motion.div
              className='inline-block'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
              <Button
                type='primary'
                size='large'
                icon={<RightOutlined />}
                className='bg-blue-500 hover:bg-blue-600 border-none text-lg h-12 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform'
                onClick={() => (window.location.href = '/services')}>
                Book Now
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className='absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/70 to-transparent'
      />
    </div>
  )
}

export default Banner
