import React from 'react'
import { Card, Typography } from 'antd'
import { motion } from 'framer-motion'

const { Title, Paragraph } = Typography

export interface ServiceWeProvideCardProps {
  serviceHighlight: {
    id: number
    icon: React.ReactNode
    headline: string
    description: string
  }
}

const ServiceWeProvideCard: React.FC<ServiceWeProvideCardProps> = ({
  serviceHighlight
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 300 }}>
      <Card
        className='h-full border-2 border-primary-300 hover:border-primary-500 rounded-lg shadow-md hover:shadow-xl transition-all duration-300'
        bodyStyle={{ padding: 0 }}>
        <div className='p-8 flex flex-col h-full relative'>
          <motion.div
            className='mb-6 text-7xl text-primary-500 flex justify-center'
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}>
            {serviceHighlight.icon}
          </motion.div>
          <Title
            level={3}
            className='mb-4 text-primary-700 text-center font-bold'>
            {serviceHighlight.headline}
          </Title>
          <Paragraph className='flex-grow text-center text-md mb-6'>
            {serviceHighlight.description}
          </Paragraph>
          <motion.div
            className='w-16 h-1 bg-primary-500 mx-auto'
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </Card>
    </motion.div>
  )
}

export default ServiceWeProvideCard
