import { Navigate } from 'react-router-dom'

export const PublicRoute = ({ children, isLoggedIn, userLogin = null }) => {
  if (isLoggedIn === false) {
    return children
  } else if (userLogin === null && isLoggedIn === false) {
    return <Navigate to='/auth/login' />
  } else {
    return <Navigate to='/' />
  }
}
