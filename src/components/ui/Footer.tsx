import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6'
import { logo } from '../../assets/logo'

const Footer = () => {
  return (
    <div className='text-white bg-black mt-12'>
      <div className='flex justify-center items-center pt-12  mb-4'>
        <img src={logo} alt='cleanCarz logo' className='w-36 h-20' />
      </div>

      <div className='flex justify-center space-x-6 mb-4 '>
        <a
          href='https://facebook.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-white  text-3xl hover:text-red-600'>
          <FaFacebook />
        </a>
        <a
          href='https://instagram.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-white hover:text-red-600 text-3xl'>
          <FaInstagram />
        </a>
        <a
          href='https://linkedin.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-white hover:text-red-600 text-3xl'>
          <FaLinkedin />
        </a>
        <a
          href='https://github.com'
          target='_blank'
          rel='noopener noreferrer'
          className='text-white hover:text-red-600 text-3xl'>
          <FaGithub />
        </a>
      </div>
      <div className=' text-center text-gray-500'>
        <ul className='flex justify-center space-x-6 mb-4'>
          <li>
            <a href='/privacy-policy' className='hover:text-gray-400'>
              Privacy Policy
            </a>
          </li>

          <li>
            <a href='/contact-us' className='hover:text-gray-400'>
              Contact Us
            </a>
          </li>
          <li>
            <a href='/refund-policy' className='hover:text-gray-400'>
              Refund Policy
            </a>
          </li>
        </ul>
      </div>
      <div className='bg-secondary-500 text-center py-4'>
        <p className='text-white text-sm'>
          © RentWheels - 2024 | All Rights Reserved. Designed By Prince Rubel
        </p>
      </div>
    </div>
  )
}

export default Footer
