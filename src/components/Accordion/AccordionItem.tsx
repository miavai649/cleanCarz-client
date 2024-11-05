import { AnimatePresence, motion } from 'framer-motion'
import { GoArrowDownRight, GoArrowUpRight } from 'react-icons/go'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
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
          className='text-primary-500 text-3xl'>
          {isOpen ? <GoArrowUpRight /> : <GoArrowDownRight />}
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

export default AccordionItem
