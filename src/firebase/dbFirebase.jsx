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

const firebaseTestConfig = {
  apiKey: envKeys.VITE_APP_API_KEY_TEST,
  authDomain: envKeys.VITE_APP_AUTH_DOMAIN_TEST,
  projectId: envKeys.VITE_APP_PROJECT_ID_TEST,
  storageBucket: envKeys.VITE_APP_STORAGE_BUCKET_TEST,
  messagingSenderId: envKeys.VITE_APP_MESSAGING_SENDER_ID_TEST,
  appId: envKeys.VITE_APP_APP_ID_TEST
}

let app

(process.env.NODE_ENV === 'test')
  ? app = initializeApp(firebaseTestConfig) // test
  : app = initializeApp(firebaseConfig) // dev or prod

const db = getFirestore(app)
const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider(app)

// const analytics = getAnalytics(app)

export {
  db,
  googleAuthProvider,
  auth
}
