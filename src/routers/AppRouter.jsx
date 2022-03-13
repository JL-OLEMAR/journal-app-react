
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { useLoggedIn } from '../hooks/useLoggedIn.jsx'
import { JournalScreen } from '../components/journal/JournalScreen.jsx'

import { PublicRoute } from './PublicRoute.jsx'
import { PrivateRoute } from './PrivateRoute.jsx'
import { AuthRouter } from './AuthRouter.jsx'

export const AppRouter = () => {
  const { isLoggedIn, userLogin } = useLoggedIn()

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <JournalScreen />
            </PrivateRoute>
            }
          path='/'
        />

        <Route
          element={
            <PublicRoute isLoggedIn={isLoggedIn} userLogin={userLogin}>
              <AuthRouter />
            </PublicRoute>
            }
          path='/auth/*'
        />
      </Routes>
    </BrowserRouter>
  )
}
