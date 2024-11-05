import { ReactNode } from 'react'
import {
  logout,
  TUserDecoded,
  useCurrentToken
} from '../../redux/features/auth/authSlice'
import { Navigate, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hook'
import { verifyToken } from '../../utils/verifyToken'

type TProtectedRouteProps = {
  children: ReactNode
  role?: string
}

const ProtectedRoute = ({ children, role }: TProtectedRouteProps) => {
  const token = useAppSelector(useCurrentToken)
  const location = useLocation()
  const dispatch = useAppDispatch()

  const adminPaths = [
    '/admin',
    '/admin/slot-management',
    '/admin/users',
    '/admin/booking'
  ]
  const userPaths = ['/user', '/user/my-booking']

  if (!token) {
    const isDashboardPath =
      adminPaths.includes(location.pathname) ||
      userPaths.includes(location.pathname)

    if (!isDashboardPath) {
      return <Navigate to='/login' state={{ from: location }} replace />
    } else {
      return <Navigate to='/login' replace />
    }
  }

  const user = verifyToken(token) as TUserDecoded

  if (role !== undefined && role !== user?.userRole) {
    dispatch(logout())
    return <Navigate to='/login' replace />
  }

  return children
}

export default ProtectedRoute
