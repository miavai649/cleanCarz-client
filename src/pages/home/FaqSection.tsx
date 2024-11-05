import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaQuestionCircle,
  FaCarSide,
  FaClock,
  FaCalendarAlt,
  FaSprayCan,
  FaBan,
  FaPercent
} from 'react-icons/fa'
import SectionHeader from '../../components/ui/SectionHeader'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

const headingProps = {
  heading: 'Frequently Asked Questions',
  description:
    'Find answers to common questions about our services, booking process, and more. Need further help? Just reach out!'
}

const faqItems = [
  {
    question: 'What services do you offer?',
    answer:
      'We offer a range of car wash services, including exterior and interior detailing, eco-friendly washing, waxing, and tire cleaning. Each service can be tailored to your needs.',
    icon: <FaCarSide />
  },
  {
    question: 'How long does a typical car wash take?',
    answer:
      'The duration varies based on the service. Basic washes take about 20-30 minutes, while full detailing may take 1-2 hours. You will receive an estimated time when booking.',
    icon: <FaClock />
  },
  {
    question: 'Do I need to book an appointment in advance?',
    answer:
      'We recommend booking in advance, especially for full detailing services, to ensure we can accommodate you at your preferred time. Walk-ins are also welcome, but availability may be limited.',
    icon: <FaCalendarAlt />
  },
  {
    question: 'Are your products safe for my cars paint and interior?',
    answer:
      'Yes, we use high-quality, eco-friendly products that are safe for both the exterior paint and interior surfaces. Our products are selected to provide a thorough clean while protecting your car.',
    icon: <FaSprayCan />
  },
  {
    question: 'What is your cancellation policy?',
    answer:
      'You can cancel or reschedule your appointment up to 24 hours in advance without any fees. For last-minute cancellations, please contact us directly to discuss options.',
    icon: <FaBan />
  },
  {
    question: 'Do you offer any discounts or memberships?',
    answer:
      'Yes, we offer loyalty discounts and membership options for regular customers. Contact us or check our website for current promotions and membership benefits.',
    icon: <FaPercent />
  }
]

const AccordionItem: React.FC<{
  question: string
  answer: string
  icon: React.ReactNode
  isOpen: boolean
  onClick: () => void
}> = ({ question, answer, icon, isOpen, onClick }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        backgroundColor: isOpen ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
      }}
      transition={{ duration: 0.3 }}
      className='mb-4 rounded-lg overflow-hidden'>
      <motion.button
        className='flex items-center w-full py-5 px-6 text-left focus:outline-none'
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}>
        <div className='mr-4 text-primary-500 text-xl'>{icon}</div>
        <span className='text-lg font-semibold text-gray-800 flex-grow'>
          {question}
        </span>
        <motion.div
          initial={false}
          transition={{ duration: 0.3 }}
          className='text-primary-500 text-xl'>
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </motion.div>
      </motion.button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key='content'
            initial='collapsed'
            animate='open'
            exit='collapsed'
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}>
            <motion.div
              variants={{ collapsed: { scale: 0.8 }, open: { scale: 1 } }}
              transition={{ duration: 0.4 }}
              className='px-6 pb-5 text-gray-600'>
              {answer}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='container mx-auto px-4 py-12'>
        <SectionHeader props={headingProps} />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className='mt-12 max-w-3xl mx-auto'>
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              icon={item.icon}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default FaqSection
