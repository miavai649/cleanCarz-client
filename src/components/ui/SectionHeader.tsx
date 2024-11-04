import { motion } from 'framer-motion'

interface SectionHeaderProps {
  props: {
    heading: string
    description: string
  }
}

const SectionHeader = ({ props }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='text-center mb-12'>
      <h2 className='text-2xl md:text-4xl font-extrabold text-gray-800 mb-4'>
        {props.heading}
      </h2>
      <p className='text-gray-600 text-base md:text-lg'>{props.description}</p>
      <div className='mt-2 w-16 md:w-24 mx-auto h-1 bg-primary-800 rounded'></div>
    </motion.div>
  )
}

export default SectionHeader
