import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "TBD",
    authDomain: "TBD",
    projectId: "TBD",
    storageBucket: "TBD",
    messagingSenderId: "TBD",
    appId: "TBD",
    measurementId: "TBD"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export {db};
export {auth};
export {storage};
