import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
}

// const firebaseConfigTesting = {
//   apiKey: 'AIzaSyBX2UPDauCQNbuJdubKERAuUIyyEp1OaAU',
//   authDomain: 'sixth-foundry-245002.firebaseapp.com',
//   databaseURL: 'https://sixth-foundry-245002.firebaseio.com',
//   projectId: 'sixth-foundry-245002',
//   storageBucket: 'sixth-foundry-245002.appspot.com',
//   messagingSenderId: '732681326378',
//   appId: '1:732681326378:web:59521b20042eae008c9853'
// }

// if (process.env.NODE_ENV === 'test') {
//   // testing
//   firebase.initializeApp(firebaseConfigTesting)
// } else {
//   // dev/prod
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig)
// }

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
  db,
  googleAuthProvider,
  firebase
}
