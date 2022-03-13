import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { login } from '../actions/auth.jsx'
import { startLoadingNotes } from '../actions/notes.jsx'
import { authStateChangedFirebase } from '../firebase/authFirebase.jsx'

export const useLoggedIn = () => {
  const dispatch = useDispatch()

  const [userLogin, setUserLogin] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    try {
      authStateChangedFirebase((user) => {
        if (user) {
          const { uid, displayName } = user
          dispatch(login(uid, displayName))

          setIsLoggedIn(true)
          setUserLogin(uid)
          dispatch(startLoadingNotes(uid))
        } else {
          setIsLoggedIn(false)
          setUserLogin(null)
        }
      })
    } catch (e) {
      console.log(e)
    }
  }, [dispatch])

  return { isLoggedIn, userLogin }
}
