import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from 'firebase/auth'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'

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
      .catch(() => {
        Swal.fire('Error', 'Enter your credentials correctly.', 'error')
        dispatch(uiFinishLoading())
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
export const startRegisterWithEmailPasswordName = (name, email, password) => {
  return (dispatch) => {
    dispatch(uiStartLoading())

    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        // Update displayName to name of the profile user
        await updateProfile(auth.currentUser, { displayName: name })

        // Login to Firebase
        dispatch(login(user.uid, user.displayName))
        dispatch(uiFinishLoading())
      })
      .catch(() => {
        Swal.fire('Error', 'Fill in all the data correctly.', 'error')
        dispatch(uiFinishLoading())
      })
  }
}

// Logout
export const logout = () => ({
  type: types.logout
})

// Logout
export const startLogout = () => {
  return async (dispatch) => {
    await signOut(auth)

    dispatch(logout())
    dispatch(noteLogout())
  }
}
