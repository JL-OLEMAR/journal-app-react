import Swal from 'sweetalert2'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'

import { types } from '../types/types.jsx'
import { auth, googleAuthProvider } from '../firebase/firebase-config.jsx'

import { noteLogout } from './notes.jsx'
import { uiFinishLoading, uiStartLoading } from './ui.jsx'

// Login
export const login = (uid, displayName) => ({
  type: types.login,
  payload: { uid, displayName }
})

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(uiStartLoading())

    return signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
        dispatch(uiFinishLoading())
      })
      .catch(e => {
        console.log(e)
        dispatch(uiFinishLoading())
        Swal.fire('Error', e.message, 'error')
      })
  }
}

// Google Login
export const startGoogleLogin = () => {
  return (dispatch) => {
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName))
      })
  }
}

// Register
export const startRegisterWithEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name })
        dispatch(login(user.uid, user.displayName))
      })
      .catch(e => {
        console.log(e)
        Swal.fire('Error', e.message, 'error')
      })
  }
}

// Logout
export const logout = () => ({
  type: types.logout
})

export const startLogout = () => {
  return async (dispatch) => {
    await signOut(auth)

    dispatch(logout())
    dispatch(noteLogout())
  }
}
