import { Route, Routes } from 'react-router-dom'

import { LoginScreen } from '../components/auth/LoginScreen.jsx'
import { RegisterScreen } from '../components/auth/RegisterScreen.jsx'

export const AuthRouter = () => {
  return (
    <div className='auth-main config-center'>
      <div className='auth-container'>
        <Routes>
          <Route element={<LoginScreen />} path='/login' />
          <Route element={<RegisterScreen />} path='/register' />
          {/* Redirect to login if no route is matched */}
          <Route element={<LoginScreen />} path='/' />
        </Routes>
      </div>
    </div>
  )
}
