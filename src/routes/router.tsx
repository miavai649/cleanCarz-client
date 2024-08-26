import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home/Home'
import Services from '../pages/services/Services'
import Login from '../pages/login/Login'
import Booking from '../pages/booking/Booking'

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
        path: '/login',
        element: <Login />
      },
      {
        path: '/booking',
        element: <Booking />
      }
    ]
  }
])

export default router
