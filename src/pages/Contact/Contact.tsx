import React, { useState } from 'react'
import { motion } from 'framer-motion'

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative h-80 overflow-hidden'>
        <div className='absolute inset-0 bg-primary-700 opacity-70'></div>
        <motion.div
          className='absolute inset-0 flex items-center justify-center text-white z-10'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <h1 className='text-5xl font-bold text-center'>Get in Touch</h1>
        </motion.div>
      </section>

      <div className='container mx-auto px-6 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
          {/* Contact Form */}
          <motion.section
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>
            <h2 className='text-3xl font-semibold text-primary-700 mb-6'>
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className='space-y-5'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500'
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500'
                />
              </div>
              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Message
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500'></textarea>
              </div>
              <motion.button
                type='submit'
                className='w-full bg-primary-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-primary-700 transition duration-300'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                Send Message
              </motion.button>
            </form>
          </motion.section>

          {/* Google Map */}
          <motion.section
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}>
            <h2 className='text-3xl font-semibold text-primary-700 mb-6'>
              Find Us
            </h2>
            <div className='h-96 rounded-lg overflow-hidden shadow-lg'>
              <iframe
                src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215707164965!2d-73.98784368459377!3d40.74844097932764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1620305280843!5m2!1sen!2sus'
                width='100%'
                height='100%'
                style={{ border: 0 }}
                allowFullScreen
                loading='lazy'></iframe>
            </div>
          </motion.section>
        </div>

        {/* Our Locations */}
        <motion.section
          className='mt-16'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <h2 className='text-3xl font-semibold text-primary-700 mb-6'>
            Our Locations
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                name: 'Downtown',
                address: '123 Main St, City, State 12345',
                phone: '(123) 456-7890'
              },
              {
                name: 'Uptown',
                address: '456 Oak Ave, City, State 12345',
                phone: '(123) 456-7891'
              },
              {
                name: 'Suburb',
                address: '789 Pine Rd, City, State 12345',
                phone: '(123) 456-7892'
              }
            ].map((location, index) => (
              <motion.div
                key={index}
                className='bg-white p-6 rounded-lg shadow-md'
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}>
                <h3 className='text-xl font-semibold text-primary-600 mb-1'>
                  {location.name}
                </h3>
                <p className='text-gray-600 mb-1'>{location.address}</p>
                <p className='text-gray-600'>{location.phone}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default ContactUs
