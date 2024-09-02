import { Avatar, Button, Dropdown, MenuProps, Spin, Statistic } from 'antd'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { logo } from '../../assets/logo'
import { CiLogin } from 'react-icons/ci'
import { largeScreenLinks, mobileNavbarLinks } from '../../constants/navbar'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import {
  logout,
  TUserDecoded,
  useCurrentToken
} from '../../redux/features/auth/authSlice'
import { verifyToken } from '../../utils/verifyToken'
import { useGetMeQuery } from '../../redux/features/auth/authApi'
import { useGetMyBookingQuery } from '../../redux/features/booking/bookingApi'
import moment from 'moment'

const { Countdown } = Statistic

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

  const { data: userData } = useGetMeQuery({}, { skip: !token })

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

  const { data: myBookingData, isLoading: myBookingLoading } =
    useGetMyBookingQuery(undefined, { skip: !token })

  const findNextBooking = () => {
    const today = moment()
    const upcomingBookings = myBookingData?.data?.filter((booking) =>
      moment(booking.slot.date).isSameOrAfter(today)
    )
    if (upcomingBookings && upcomingBookings.length > 0) {
      return upcomingBookings.sort((a, b) =>
        moment(`${a.slot.date} ${a.slot.startTime}`).diff(
          moment(`${b.slot.date} ${b.slot.startTime}`)
        )
      )[0]
    }
    return null
  }

  const nextBooking = findNextBooking()

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled ? 'bg-black/80 shadow-md h-16' : 'bg-black h-24'
      }`}>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full'>
        {/* log */}
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

        {/* navigation links for large screen */}
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

        {/* left side of the navbar */}
        <div className='flex items-center space-x-4'>
          {/* countdown for the next slot */}
          <>
            {myBookingLoading ? (
              <Spin />
            ) : (
              nextBooking &&
              token && (
                <div className='bg-white text-black p-2 rounded-lg flex flex-col justify-center items-center'>
                  <span className='font-semibold text-sm mr-2'>Next Slot:</span>
                  <Countdown
                    title={null}
                    value={moment(
                      `${nextBooking.slot.date} ${nextBooking.slot.startTime}`
                    )
                      .toDate()
                      .getTime()}
                    format='HH:mm:ss'
                    className='text-xs '
                  />
                </div>
              )
            )}
          </>

          {token && (
            <Dropdown trigger={['click']} menu={{ items }} placement='bottom'>
              <Avatar
                size={40}
                className='cursor-pointer'
                src={userData?.data?.image}
                alt={userData?.data?.name}
                style={{
                  backgroundColor: '#418FC8',
                  verticalAlign: 'middle'
                }}>
                {!userData?.data?.image && (
                  <span
                    style={{
                      fontSize: '0.875rem',
                      fontWeight: 'bold'
                    }}>
                    {userData?.data?.name?.charAt(0)}
                  </span>
                )}
              </Avatar>
            </Dropdown>
          )}

          {/* navbar log in btn */}
          {!token && (
            <Link to='/login' className='text-white'>
              <Button
                type='primary'
                icon={
                  <CiLogin
                    style={{
                      fontWeight: 800,
                      fontSize: '16px',
                      color: '#ffffff'
                    }}
                  />
                }
                className={` ${
                  location.pathname === '/login'
                    ? 'bg-primary-600'
                    : 'bg-secondary-500'
                } text-white font-medium rounded-md px-3 py-1`}>
                Login
              </Button>
            </Link>
          )}

          {/* side bar trigger for mobile device */}
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

      {/* navigation links for mobile device */}
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
