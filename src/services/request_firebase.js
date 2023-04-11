import { auth, db } from "./config_firebase";
import { createUserWithEmailAndPassword, 
          AuthErrorCodes,
          signInWithEmailAndPassword } from "firebase/auth";

import { collection, getDocs, doc, setDoc, query, where, getDoc } from "firebase/firestore/lite";

function errorsFirebase(error){

  let msg = '';
  
  switch(error.code) {

    case AuthErrorCodes.EMAIL_EXISTS:
      msg = "Email já está em uso. Por favor, tente outro.";
      break;
    case AuthErrorCodes.INVALID_EMAIL:
      msg = "Este e-mail não é válido. Por favor, digite um e-mail válido.";
      break;
    case AuthErrorCodes.WEAK_PASSWORD:
      msg = "A senha deve ter no mínimo 6 caracteres.";
      break;
    default:
      msg = "Erro desconhecido";

  }
  return msg;


}


export async function userNameAvailable(username) {

  let res = 'success'
  const q = query(collection(db, "users"), where('username', "==", username));  
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    res =  'Nome de usuário '  + username + ' já está em uso. Por favor, tente outro.'    
  });

  return res

}  

export async function onRegister(email, password, username, name_,image_,position_, level_, ct_) {

  
  const result = await createUserWithEmailAndPassword(auth, email, password)
  .then((userData) => {
    console.log(userData)

    return "success"

  })
  .catch((error) => {
    console.log(error)
    return errorsFirebase(error)
  });

  await setDoc(doc(db, 'users', auth.currentUser.uid), {
    name: name_,
    email: email,
    username: username,
    image: image_,
    followingCount: 0,
    followersCount: 0,
    position: position_,
    level: level_,
    ct: ct_      
  })    
  .then(() => {
    console.log("Successful")
    return "success"
  })
    .catch((error) => {
    console.log(`Unsuccessful returned error ${error}`)
  });


  return result;
}


export async function onSingIn(email, password) {
  const result = await signInWithEmailAndPassword(auth, email, password)
  .then((userData) => {
    console.log(userData)
    return "success"
  })
  .catch((error) => {
    console.log(error)
    //return errorsFirebase(error)
    return "error"
  });

  return result;
}

