import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// import { getAnalytics } from 'firebase/analytics'

const envKeys = import.meta.env

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: envKeys.VITE_APP_API_KEY,
  authDomain: envKeys.VITE_APP_AUTH_DOMAIN,
  projectId: envKeys.VITE_APP_PROJECT_ID,
  storageBucket: envKeys.VITE_APP_STORAGE_BUCKET,
  messagingSenderId: envKeys.VITE_APP_MESSAGING_SENDER_ID,
  appId: envKeys.VITE_APP_APP_ID,
  measurementId: envKeys.VITE_APP_MEASUREMENT_ID
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const googleAuthProvider = new GoogleAuthProvider()
const auth = getAuth()

export {
  db,
  googleAuthProvider,
  auth
}
