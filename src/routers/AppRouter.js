import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom'
import { login } from '../actions/auth'
import { startLoadingNotes } from '../actions/notes'
import { JournalScreen } from '../components/journal/JournalScreen'
import { firebase } from '../firebase/firebase-config'
import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

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
            component={JournalScreen}
            exact
            isAuthenticated={isLoggedIn}
            path='/'
          />

          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </Router>
  )
}
