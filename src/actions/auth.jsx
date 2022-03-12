import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'

import { types } from '../types/types.jsx'
import {
  loginFirebase,
  loginGoogleFirebase,
  registerFirebase,
  logoutFirebase
} from '../firebase/authFirebase.jsx'

import { noteLogout } from './notes.jsx'
import { uiFinishLoading, uiStartLoading } from './ui.jsx'

// Login
export const login = (uid, displayName) => ({
  type: types.login,
  payload: { uid, displayName }
})

// Login with Email and Password (Firebase)
export const startLoginEmailPassword = (email, password) => {
  return async (dispatch) => {
    dispatch(uiStartLoading())
    try {
      const { uid, displayName } = await loginFirebase(email, password)

      dispatch(login(uid, displayName))
      dispatch(uiFinishLoading())
    } catch (e) {
      Swal.fire('Error', 'Enter your credentials correctly.', 'error')
      dispatch(uiFinishLoading())
      console.log(e)
    }
  }
}

// Login with Google (Firebase)
export const startGoogleLogin = () => {
  return async (dispatch) => {
    try {
      const { uid, displayName } = await loginGoogleFirebase()

      dispatch(login(uid, displayName))
    } catch (e) {
      console.log(e)
    }
  }
}

// Register (Firebase)
export const startRegisterWithEmailPasswordName = (name, email, password) => {
  return async (dispatch) => {
    dispatch(uiStartLoading())

    try {
      const { uid, displayName } = await registerFirebase(name, email, password)

      dispatch(login(uid, displayName))
      dispatch(uiFinishLoading())
    } catch (error) {
      console.log(error)
      Swal.fire('Error', 'Fill in all the data correctly.', 'error')
      dispatch(uiFinishLoading())
    }
  }
}

// Logout
export const logout = () => ({
  type: types.logout
})

// Logout (Firebase)
export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase()

    dispatch(logout())
    dispatch(noteLogout())
  }
}
