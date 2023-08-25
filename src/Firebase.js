import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCPiZMSU5MocVZSdEXwNTDKicoIu6jJ8co",
  authDomain: "todo-app-f7f3a.firebaseapp.com",
  projectId: "todo-app-f7f3a",
  storageBucket: "todo-app-f7f3a.appspot.com",
  messagingSenderId: "259458476277",
  appId: "1:259458476277:web:f3fe1bd7daab04ce057dbc"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }