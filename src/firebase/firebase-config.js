import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCu9ktSwzImg4LH3bqSjue_O48qcLcbEEw',
  authDomain: 'react-app-cursos-38205.firebaseapp.com',
  projectId: 'react-app-cursos-38205',
  storageBucket: 'react-app-cursos-38205.appspot.com',
  messagingSenderId: '42948571996',
  appId: '1:42948571996:web:f0d3144b87b4d060eec799'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
  db,
  googleAuthProvider,
  firebase
}
