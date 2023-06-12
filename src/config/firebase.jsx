import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyB0cLvbskCuOzhlvUUFlLZRxmknI1N1Lek",
  authDomain: "fir-26b24.firebaseapp.com",
  projectId: "fir-26b24",
  storageBucket: "fir-26b24.appspot.com",
  messagingSenderId: "82228561495",
  appId: "1:82228561495:web:ac495b5882730cc54d8512"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fs = getFirestore(app);
const storage = getStorage(app);
export { auth, fs, storage };