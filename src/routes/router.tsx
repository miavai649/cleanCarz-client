import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home/Home'
import Services from '../pages/services/Services'
import Login from '../pages/login/Login'
import Register from '../pages/register/Register'
import ServiceDetails from '../pages/serviceDetails/ServiceDetails'
import BookingPage from '../pages/BookingPage/BookingPage'
import NotFound from '../pages/notFound/NotFound'
import DashboardLayout from '../components/layouts/DashboardLayout'
import ServiceManagement from '../pages/admin/ServiceManagement'
import SlotManagement from '../pages/admin/SlotManagement'
import ProtectedRoute from '../components/layouts/ProtectedRoute'
import Users from '../pages/admin/Users'
import Booking from '../pages/admin/Booking'
import MyProfile from '../pages/user/MyProfile'
import MyBooking from '../pages/user/MyBooking'
import AllReviews from '../pages/home/AllReviews'
import ServiceComparison from '../pages/ServiceComparision/ServiceComparison'
import AboutUs from '../pages/AboutUs/AboutUs'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/reviews',
        element: <AllReviews />
      },
      {
        path: '/services',
        element: <Services />
      },
      {
        path: '/service-details/:serviceId',
        element: <ServiceDetails />
      },
      {
        path: '/booking-page/:serviceId/:slotId',
        element: (
          <ProtectedRoute role='user'>
            <BookingPage />
          </ProtectedRoute>
        )
      },

      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/service-comparison',
        element: <ServiceComparison />
      },
      {
        path: '/about-us',
        element: <AboutUs />
      }
    ]
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute role='admin'>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <ServiceManagement />,
        index: true
      },
      {
        path: 'slot-management',
        element: <SlotManagement />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'booking',
        element: <Booking />
      }
    ]
  },
  {
    path: '/user',
    element: (
      <ProtectedRoute role='user'>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <MyProfile />,
        index: true
      },
      {
        path: 'my-booking',
        element: <MyBooking />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router
