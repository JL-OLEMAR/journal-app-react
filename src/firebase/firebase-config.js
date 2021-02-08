import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// console.log(process.env)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
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
