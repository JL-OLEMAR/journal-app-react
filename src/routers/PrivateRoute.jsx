import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ children, userLogin, isLoggedIn }) => {
  return (
    (isLoggedIn === false && userLogin !== null)
      ? <Navigate to='/auth/login' />
      : children
  )
}
