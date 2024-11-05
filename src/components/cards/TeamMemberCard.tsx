import React from 'react'
import { motion } from 'framer-motion'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa'

export interface TeamMemberCardProps {
  member: {
    id: number
    name: string
    role: string
    image: string
  }
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <motion.div
      className='relative rounded-xl overflow-hidden group'
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}>
      <div className='relative  overflow-hidden rounded-xl'>
        <div className='absolute inset-0 bg-black/50 opacity-100 group-hover:opacity-0 transition-opacity duration-500 z-10'></div>

        <img
          src={member.image}
          alt={member.name}
          className='w-full h-full object-cover'
        />

        <motion.div className='absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20'>
          <a
            href='#'
            className='p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors'>
            <FaFacebook className='text-white text-lg' />
          </a>
          <a
            href='#'
            className='p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors'>
            <FaTwitter className='text-white text-lg' />
          </a>
          <a
            href='#'
            className='p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors'>
            <FaLinkedin className='text-white text-lg' />
          </a>
          <a
            href='#'
            className='p-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors'>
            <FaInstagram className='text-white text-lg' />
          </a>
        </motion.div>
      </div>

      <div className='p-3 bg-[#1a1a1a] rounded-b-lg shadow-lg mt-2 text-center'>
        <h3 className='text-lg font-semibold text-white'>{member.name}</h3>
        <p className='text-gray-400 text-sm'>{member.role}</p>
      </div>
    </motion.div>
  )
}

export default TeamMemberCard
