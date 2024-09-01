import { Button, Dropdown, MenuProps } from 'antd'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { logo } from '../../assets/logo'
import { CiLogin } from 'react-icons/ci'
import { largeScreenLinks, mobileNavbarLinks } from '../../constants/navbar'
import { FaCircleUser } from 'react-icons/fa6'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import {
  logout,
  TUserDecoded,
  useCurrentToken
} from '../../redux/features/auth/authSlice'
import { verifyToken } from '../../utils/verifyToken'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const location = useLocation()
  const dispatch = useAppDispatch()

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

  const token = useAppSelector(useCurrentToken)

  let user

  if (token) {
    user = verifyToken(token) as TUserDecoded
  }

  const items: MenuProps['items'] = [
    {
      key: '2',
      label: (
        <Link to={`/${user?.userRole}`}>
          <button>Dashboard</button>
        </Link>
      )
    },
    {
      key: '1',
      label: <button onClick={() => dispatch(logout())}>Log out</button>
    }
  ]

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? 'bg-black/80 shadow-md h-16' : 'bg-black h-24'
      }`}>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full'>
        {/* Logo */}
        <div className='flex-shrink-0'>
          <a href='/'>
            <img
              src={logo}
              alt='CleanCarz logo'
              className={`w-[80px] h-[40px] transition-all duration-500 ease-in-out ${
                isScrolled ? 'scale-75' : 'scale-100'
              }`}
            />
          </a>
        </div>

        {/* Navigation links */}
        <div className='hidden lg:flex space-x-8'>
          {largeScreenLinks.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className={`relative text-lg font-medium text-primary-600 hover:text-secondary-500 transition-all duration-300 ease-in-out ${
                location.pathname === item.path
                  ? ' border-b-2 border-secondary-500'
                  : ''
              }`}>
              {item.name}
              {location.pathname === item.path && (
                <span className='absolute inset-x-0 bottom-0 border-b-2 border-secondary-500'></span>
              )}
            </Link>
          ))}
        </div>

        {/* Avatar and login buttons */}
        <div className='flex items-center space-x-4'>
          {token && (
            <Dropdown trigger={['click']} menu={{ items }} placement='bottom'>
              <Button
                style={{
                  border: 'none',
                  padding: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#56A7DC',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  transition: 'background-color 0.3s ease'
                }}
                type='text'>
                <FaCircleUser className='text-white text-xl' />
              </Button>
            </Dropdown>
          )}

          <div>
            {!token && (
              <Link to='/login' className='text-white'>
                <Button
                  type='primary'
                  icon={
                    <CiLogin
                      style={{
                        fontWeight: 800,
                        fontSize: '18px',
                        color: '#ffffff'
                      }}
                    />
                  }
                  className={` ${
                    location.pathname === '/login'
                      ? 'bg-primary-600'
                      : 'bg-secondary-500'
                  } text-white font-medium rounded-md px-4 py-2 flex items-center`}>
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
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

      {/* Sidebar for Mobile */}
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
            {mobileNavbarLinks.map((item, idx) => (
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
