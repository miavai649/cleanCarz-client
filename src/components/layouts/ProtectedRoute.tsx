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

  if (!token) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  const user = verifyToken(token) as TUserDecoded
  const dispatch = useAppDispatch()

  if (role !== undefined && role !== user?.userRole) {
    dispatch(logout())
    return <Navigate to='/login' replace />
  }

  return children
}

export default ProtectedRoute
