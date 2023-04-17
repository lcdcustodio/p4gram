import React, { useState, useEffect } from 'react'

import Bio from '../../components/AccountComponents/Bio';
import Highlighs from '../../components/AccountComponents/Highlighs';
import ProfilBar from '../../components/AccountComponents/ProfilBar';
import ProfileHeader from '../../components/AccountComponents/ProfilHeader';
import Container from '../../components/Container/Container';
import TopTabNavigator from '../../navigation/TopTabNavigator';
//------------
import { auth } from '../../services/config_firebase';
//import { fetchUser } from '../../redux/actions';
import { connect } from 'react-redux'
//------------

//const SingleMessage = ({route, navigation}) => {
//const Account = ({route, navigation}) => {
//const Account = ({route}) => {
//const Account = (props) => {  
function Account(props) {
  
  const [user, setUser] = useState(null);

  console.log('-----------');
  console.log('--Account--');
  console.log('-----------'); 
  console.log(props);


  useEffect(() => {
    const { currentUser } = props;
    setUser(currentUser)

    console.log('--------');
    console.log('--user--');
    console.log('--------'); 
       
    console.log(user);

  
  }, [])
  //}, [props.route])

  return (
    <Container insets={{top: true, right: true, bottom: true}}>
      <ProfilBar route={props.currentUser} />
      <ProfileHeader route={props.currentUser} />
      <Bio route={props.currentUser} />
      {/* 
      <ProfilBar route={user} />
      <ProfileHeader route={user} />
      <Bio route={user} />

      <Highlighs />
      */} 
      <TopTabNavigator />
      
    </Container>
  );
};
//export default Account;

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, null)(Account);    

