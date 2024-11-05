import React from 'react'
import TeamMemberCard from '../../components/cards/TeamMemberCard'
import SectionHeader from '../../components/ui/SectionHeader'

const teamMembers = [
  {
    id: 1,
    name: 'Omar R.',
    role: 'Engine Specialized',
    image:
      'https://careix.betteropt.in/wp-content/uploads/2024/08/34529-e1726907310715-380x400.jpg' // Replace with actual image
  },
  {
    id: 2,
    name: 'Shajaat Hossain',
    role: 'Engine Expert',
    image:
      'https://careix.betteropt.in/wp-content/uploads/2024/08/34534-380x400.jpg' // Replace with actual image
  },
  {
    id: 3,
    name: 'Ayan M',
    role: 'Engine Expert',
    image:
      'https://careix.betteropt.in/wp-content/uploads/2024/08/34526-380x400.jpg' // Replace with actual image
  }
]

const headingProps = {
  heading: 'Our Awesome Team',
  description:
    ' Experience the best car care with our range of premium services designed to keep your vehicle in top condition.'
}

const TeamMembers: React.FC = () => {
  return (
    <div className='container mx-auto px-4 py-12'>
      <SectionHeader props={headingProps} />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}

export default TeamMembers
