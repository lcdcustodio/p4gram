import { auth, db } from "../../services/config_firebase";
import { collection, getDoc, doc, getDocs, query, orderBy, limit} from "firebase/firestore/lite";
import { USER_STATE_CHANGE, 
         USER_POSTS_STATE_CHANGE, 
         USER_FOLLOWING_STATE_CHANGE, 
         USERS_DATA_STATE_CHANGE,
         USERS_POSTS_STATE_CHANGE,
         USERS_LIKES_STATE_CHANGE,
         CLEAR_DATA } from '../constants/index';

import { SnapshotViewIOSComponent } from 'react-native'


export function clearData() {
  return ((dispatch) => {
      /*
      console.log('---------------------------')
      console.log('-----CLEAR_DATA------------')
      console.log('---------------------------')    
      */
      dispatch({type: CLEAR_DATA})
  })
}

export function fetchUser() {
    return async function action(dispatch) {

      //console.log(authentication.currentUser.uid);
      //console.log('lala');
      const docRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      ////console.log('docSnap: ' + docSnap.data());

      if (docSnap.exists()) {
          //console.log("Document data:", docSnap.data());
          dispatch({ type: USER_STATE_CHANGE, currentUser: { uid: auth.currentUser.uid, ...docSnap.data() } })

      } else {          
          console.log("Redux - No such document!");
      }


    }
}

export function fetchUserPosts() {
    return async function action(dispatch) {


      const docRef = doc(db, 'posts', auth.currentUser.uid);
      const colRef = collection(docRef, 'userPosts')
      //const q = query(colRef, orderBy('creation', 'asc'), limit(50));
      const q = query(colRef, orderBy('creation', 'asc'));

      await getDocs(q)
      .then(querySnapshot => {
        //querySnapshot.forEach((doc) => {
          ////console.log(doc.id, " => ", doc.data());
          //*
          let posts = querySnapshot.docs.map(doc => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data }
          })
          //*/
          /*
          let posts = {
            data: doc.data(),
            id: doc.id            
          }
          */
          //console.log(posts);
          dispatch({ type: USER_POSTS_STATE_CHANGE, posts })
        //});        
      })

  }
}


export function fetchUserFollowing() {
  
  //console.log('fetchUserFollowing')

  return async function action(dispatch) {
  //  return ((dispatch) => {  
    /*
    console.log('---------------------------')
    console.log('fetchUserFollowing_dispatch')
    console.log('---------------------------')    
    */
    const docRef = doc(db, 'following', auth.currentUser.uid);
    const colRef = collection(docRef, 'userFollowing')
    await getDocs(colRef)
    //getDocs(colRef)
    .then(querySnapshot => {
        //console.log(querySnapshot)
        let following  = querySnapshot.docs.map(doc => {
          const id = doc.id;
          return id
        }) 
        //console.log('following: ' + following);
        dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following })      

        for(let i = 0; i < following.length; i++){
          //dispatch(fetchUsersData(following[i]));
          dispatch(fetchUsersData(following[i], true));
        }


    })
  //})
  }
}

export function fetchUsersData(uid, getPosts) {
  return async function action(dispatch, getState) {  
  //return ((dispatch, getState) => {
      const found = getState().usersState.users.some(el => el.uid === uid);
      if (!found) {

        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let user = docSnap.data();
          user.uid = docSnap.id;

          dispatch({ type: USERS_DATA_STATE_CHANGE, user });
          //dispatch(fetchUsersFollowingPosts(user.uid));

        }
        else {
            console.log('does not exist')
        }

        if(getPosts){
          dispatch(fetchUsersFollowingPosts(uid));
        }


      }
  }
}

export function fetchUsersFollowingPosts(uid) {
  return async function action(dispatch, getState) {


    const docRef = doc(db, 'posts', uid);
    const colRef = collection(docRef, 'userPosts')
    const q = query(colRef, orderBy('creation', 'asc'));

    //await getDocs(q)
    /*
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      console.log(" uid  => ", uid);
      let posts = doc => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data, user }
      }

      console.log(" posts  => ", posts);

      for(let i = 0; i< posts.length; i++){
        console.log ('---------')
        console.log ('uid: ' + uid)
        console.log ('posts[i].id: ' + posts[i].id)
        console.log ('---------')
  
        dispatch(fetchUsersFollowingLikes(uid, posts[i].id))
      }        
  
      dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid })
  

    })
    */  
    

    //*
    await getDocs(q)
    .then(querySnapshot => {
        //const uid = querySnapshot.query.EP.path.segments[1];
        const user = getState().usersState.users.find(el => el.uid === uid);
        console.log ('--------')
        console.log ('user: ' + user)
        console.log ('uid: ' + uid)
        //console.log ('querySnapshot.data(): ' + querySnapshot.data())
        console.log ('---------')


        let posts = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data, user }
        })
        console.log('USERS_POSTS_STATE_CHANGE: ' + posts)
        
        for(let i = 0; i< posts.length; i++){
          console.log ('--------')
          console.log ('uid: ' + uid)
          console.log ('posts[i].id: ' + posts[i].id)
          console.log ('--------')

          dispatch(fetchUsersFollowingLikes(uid, posts[i].id))
        }        

        dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid })
        //console.log('getState(): ' + getState())

    })
    //*/

  }
}

export function fetchUsersFollowingLikes(uid, postId) {
  //return ((dispatch, getState) => {
  return async function action(dispatch, getState) {


      const docRef1 = doc(db, 'posts', uid);
      const colRef1 = collection(docRef1, 'userPosts')

      const docRef2 = doc(colRef1, postId);
      const colRef2 = collection(docRef2, 'likes');

      const docRef3 = doc(colRef2, auth.currentUser.uid);

      //--------------------
      const docSnap = await getDoc(docRef3);
      let currentUserLike = false;

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        currentUserLike = true;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }

      console.log('-------');
      console.log('postId: ' + postId);
      //console.log('postId2: ' + postId2);
      console.log('-------');        
      console.log('currentUserLike: ' + currentUserLike);

      dispatch({ type: USERS_LIKES_STATE_CHANGE, postId, currentUserLike })


      //--------------------
      /*
      await getDoc(docRef3)
      .then(snapshot => {

        const postId2 = snapshot.id

        let currentUserLike = false;
        if(snapshot.exists){
            currentUserLike = true;
        }
        
        console.log('-------');
        console.log('postId: ' + postId);
        console.log('postId2: ' + postId2);
        console.log('-------');        
        console.log('currentUserLike: ' + currentUserLike);
 
        dispatch({ type: USERS_LIKES_STATE_CHANGE, postId, currentUserLike })
      })
      */
 
  }
}