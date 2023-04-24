import { auth, db } from "./config_firebase";
import { createUserWithEmailAndPassword, 
          AuthErrorCodes,
          signInWithEmailAndPassword } from "firebase/auth";

import { collection, getDocs, doc, setDoc, query, where, serverTimestamp, updateDoc } from "firebase/firestore/lite";

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


export async function userNameAvailableProfileEdit(username) {

  let res = 'success'
  const q = query(collection(db, "users"), where('username', "==", username));  
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    if (doc.data().uid !== auth.currentUser.uid){
      res =  'Nome de usuário '  + username + ' já está em uso. Por favor, tente outro.'    
    }
  });

  return res

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

export function getTimestamp(){

  var timestamp = new Date().getFullYear().toString() + 
                  new Date().getMonth().toString() +
                  new Date().getDate().toString() + 
                  new Date().getHours().toString() +
                  new Date().getMinutes().toString() +
                  new Date().getSeconds().toString() +
                  new Date().getMilliseconds().toString()

  return timestamp
}

export async function onFollow(following){

  const docRef = doc(db, 'following', auth.currentUser.uid);
  const colRef = collection(docRef, 'userFollowing')
  await setDoc(doc(colRef, following), {})

}


export async function setOwner(owner){

  const docRef = doc(db, 'ownership', auth.currentUser.uid);
  const colRef = collection(docRef, 'userGroup')
  await setDoc(doc(colRef, owner), {})

}

export async function onProfileEdit(username_,name_, ct_, level_, position_,image_){

  
  let result

  result = await updateDoc(doc(db, 'users', auth.currentUser.uid), {
    username: username_,
    name: name_,
    ct: ct_,
    level: level_,
    position: position_,
    image: image_,
    update_at: serverTimestamp(),
  })    
  .then(() => {
    console.log("Successful - Register User")
    return 'success'
    
  })
    .catch((error) => {
    console.log(`Unsuccessful returned error ${error}`)
    return error
  });

  console.log(result)
  return result;


}

export async function onRegisterGroup(username, name_, image_, isClosedGroup_){


  const doc_name = auth.currentUser.uid.toString() + '_group_' + getTimestamp()

  //const result = await setDoc(doc(db, 'users', doc_name), {

  let result

  result = await setDoc(doc(db, 'users', doc_name), {
    name: name_,
    username: username,
    image: image_,    
    followersCount: 1,
    matchCount: 0,
    scoreCount: 0,
    isClosedGroup: isClosedGroup_,
    owner: auth.currentUser.uid,
    uid: doc_name,
    type: 'group',
    update_at: serverTimestamp(),
    created_at: serverTimestamp()
  })    
  .then(() => {
    console.log("Successful - Register User")
    return 'success'
    
  })
    .catch((error) => {
    console.log(`Unsuccessful returned error ${error}`)
    return error
  });

  console.log(result)

  if(result == 'success'){

    result = await onFollow(doc_name)
    .then(() => {
      console.log("Successful - Register Following")
      return 'success'

    })  
    .catch((error) => {
      console.log(`Unsuccessful returned error ${error}`)
      return error
    });  

  } 
  console.log('----------')
  console.log(result)
  console.log('----------')
  
  if(result == 'success'){

    result = await setOwner(doc_name)
    .then(() => {
      console.log("Successful - Register Owner")
      return "success"
    })  
    .catch((error) => {
      console.log(`Unsuccessful returned error ${error}`)
      return error
    });   

  }

  console.log(result)
  return result;


}

export async function onRegisterUser(email, password, username, name_,image_,position_, level_,ct_) {

  
  const result = await createUserWithEmailAndPassword(auth, email, password)
  .then((userData) => {
    console.log('---createUserWithEmailAndPassword---')
    console.log(userData)
    console.log('---createUserWithEmailAndPassword---')
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
    matchCount: 0,
    scoreCount: 0,
    winCount: 0,
    lossCount: 0,
    position: position_,
    level: level_,
    ct: ct_,
    uid: auth.currentUser.uid,
    type: 'player',
    update_at: serverTimestamp(),
    created_at: serverTimestamp()
  })    
  .then(() => {
    console.log("----------")
    console.log("Successful")
    console.log("----------")    
    return "success"
  })
    .catch((error) => {
    console.log(`Unsuccessful returned error ${error}`)
    return error
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

