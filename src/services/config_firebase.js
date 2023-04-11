import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyB2fPdMIZrWhqf3uuX_LhrChbShsJR00bQ",
    authDomain: "blueberry-ftv.firebaseapp.com",
    projectId: "blueberry-ftv",
    storageBucket: "blueberry-ftv.appspot.com",
    messagingSenderId: "466128069165",
    appId: "1:466128069165:web:279de7f73101fab8198ea4",
    measurementId: "G-EQHNJ6062H"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export {db};
export {auth};
export {storage};