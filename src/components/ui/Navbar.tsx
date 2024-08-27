import { Avatar, Button, Dropdown, MenuProps } from 'antd'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { logo } from '../../assets/logo'

const Links = [
  { path: '/', name: 'Home' },
  { path: '/services', name: 'Services' },
  { path: '/booking', name: 'Booking' }
]

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.antgroup.com'>
        1st menu item
      </a>
    )
  },
  {
    key: '2',
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.aliyun.com'>
        2nd menu item
      </a>
    )
  },
  {
    key: '3',
    label: (
      <a
        target='_blank'
        rel='noopener noreferrer'
        href='https://www.luohanacademy.com'>
        3rd menu item
      </a>
    )
  }
]

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <nav
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        isScrolled ? 'bg-black/80 shadow-md' : 'bg-black'
      }`}>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo aligned to the left */}
          <div className='flex-shrink-0'>
            <a href='/'>
              <img
                src={logo}
                alt='CleanCarz logo'
                className='w-[80px] h-[40px]'
              />
            </a>
          </div>

          <div className='flex-1 flex items-center justify-end space-x-6'>
            <div className='hidden lg:flex items-center space-x-5'>
              {Links.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className={`relative text-white inline-block px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ease-out ${
                    location.pathname === item.path
                      ? 'bg-secondary-500 text-white shadow-sm'
                      : 'text-white hover:text-primary-500 hover:bg-gray-100 hover:shadow'
                  }`}>
                  {item.name}
                </Link>
              ))}
            </div>

            <Dropdown trigger={['click']} menu={{ items }} placement='bottom'>
              <Button
                style={{
                  border: 'none',
                  padding: 2,
                  borderRadius: '100%',
                  backgroundColor: '#56A7DC'
                }}
                type='text'>
                <Avatar
                  size={45}
                  src={
                    'https://i.ibb.co/yPLQsjm/Screenshot-2024-08-13-001037.png'
                  }
                />
              </Button>
            </Dropdown>

            <div className='lg:block md:block hidden'>
              <div className='flex items-center font-medium'>
                <Link
                  to='/auth'
                  className='text-primary-600 hover:text-secondary-500'>
                  Login
                </Link>
                /
                <Link
                  to='/auth'
                  className='text-primary-600 hover:text-secondary-500'>
                  Register
                </Link>
              </div>
            </div>

            <button
              type='button'
              className='inline-flex items-center justify-center p-2 rounded-md text-primary-500 lg:hidden focus:outline-none'
              onClick={toggleSidebar}>
              <span className='sr-only'>Open main menu</span>
              <svg
                className='h-6 w-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                aria-hidden='true'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h16m-7 6h7'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-gray-800 bg-opacity-75 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeSidebar}>
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-primary-500 p-4 transform transition-transform duration-300 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}>
          <button
            type='button'
            className='text-white mb-4 focus:outline-none'
            onClick={closeSidebar}>
            <svg
              className='h-6 w-6'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
          <div className='space-y-2'>
            {Links.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className={`block text-white px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? 'bg-secondary-500 shadow-md'
                    : 'bg-primary-500 hover:bg-primary-600'
                }`}
                onClick={closeSidebar}>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
