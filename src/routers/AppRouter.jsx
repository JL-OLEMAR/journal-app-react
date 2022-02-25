import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'

import { firebase } from '../firebase/firebase-config.jsx'
import { JournalScreen } from '../components/journal/JournalScreen.jsx'
import { login } from '../actions/auth.jsx'
import { startLoadingNotes } from '../actions/notes.jsx'

import { AuthRouter } from './AuthRouter.jsx'
import { PrivateRoute } from './PrivateRoute.jsx'
import { PublicRoute } from './PublicRoute.jsx'

export const AppRouter = () => {
  const dispatch = useDispatch()

  const [checking, setChecking] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName))
        setIsLoggedIn(true)

        dispatch(startLoadingNotes(user.uid))
      } else {
        setIsLoggedIn(false)
      }

      setChecking(false)
    })
  }, [dispatch, setChecking, setIsLoggedIn])

  if (checking) {
    return (
      <h1>Wait...</h1>
    )
  }

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            component={AuthRouter}
            isAuthenticated={isLoggedIn}
            path='/auth'
          />

          <PrivateRoute
            exact
            component={JournalScreen}
            isAuthenticated={isLoggedIn}
            path='/'
          />

          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  )
}
