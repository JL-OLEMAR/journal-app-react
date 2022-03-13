import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import { auth, googleAuthProvider } from '../firebase/dbFirebase.jsx'

// Login with Email and Password
export const loginFirebase = async (email, password) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  const { uid, displayName } = user

  return { uid, displayName }
}

// Login with Google
export const loginGoogleFirebase = async () => {
  const { user } = await signInWithPopup(auth, googleAuthProvider)
  const { uid, displayName } = user

  return { uid, displayName }
}

// Register with Email and Password
export const registerFirebase = async (name, email, password) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password)

  // Update name to displayName
  await updateProfile(auth.currentUser, { displayName: name })
  const { uid, displayName } = user

  return { uid, displayName }
}

// Logout
export const logoutFirebase = async () => {
  return await signOut(auth)
}

// On Auth State Changed
export const authStateChangedFirebase = async (callback) => {
  return await onAuthStateChanged(auth, (callback))
}
