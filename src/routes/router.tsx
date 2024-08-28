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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
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
        path: '/service-details',
        element: <ServiceDetails />
      },
      {
        path: '/booking-page',
        element: <BookingPage />
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
  }
])

export default router
