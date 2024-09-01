import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home/Home'
import Services from '../pages/services/Services'
import Login from '../pages/login/Login'
import Booking from '../pages/booking/Booking'
import Register from '../pages/register/Register'
import ServiceDetails from '../pages/serviceDetails/ServiceDetails'
import BookingPage from '../pages/BookingPage/BookingPage'
import NotFound from '../pages/notFound/NotFound'
import DashboardLayout from '../components/layouts/DashboardLayout'
import ServiceManagement from '../pages/serviceManagement/ServiceManagement'
import SlotManagement from '../pages/slotManagement/SlotManagement'
import UserManagement from '../pages/userManagement/UserManagement'
import ProtectedRoute from '../components/layouts/ProtectedRoute'

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
        path: '/booking',
        element: <Booking />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  },
  {
    path: '/admin',
    element: <DashboardLayout />,
    children: [
      {
        path: 'service-management',
        element: <ServiceManagement />,
        index: true
      },
      {
        path: 'slot-management',
        element: <SlotManagement />
      },
      {
        path: 'user-management',
        element: <UserManagement />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router
