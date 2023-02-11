import React from 'react';
import {
  Image,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Bio from '../../components/AccountComponents/Bio';

import ProfilBar from '../../components/AccountComponents/ProfilBar';
import ProfileHeader from '../../components/AccountComponents/ProfilHeader';
import Container from '../../components/Container/Container';
import TopTabNavigator from '../../navigation/TopTabNavigator';

import styles from '../Message/styles';

import styles2 from '../../components/AccountComponents/AccountComponents.style';

//const SingleMessage = ({route, navigation}) => {
const Search_details = ({route, navigation}) => {

  console.log('Search_details');
  console.log(route);

  return (
    <Container insets={{top: true, right: true, bottom: true}}>

      <View style={styles.back}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={32} color="white" />
          </TouchableWithoutFeedback>
          <Text style={styles.userName}>{route.params.username}</Text>
        </View>
      </View>

       
      <ProfileHeader route={route.params} />

      <SafeAreaView>
        <View style={styles2.bioContainer}>
          <Text style={styles2.userName}> {route.params.name}</Text>
          <Text style={styles2.bio}>
            {'Atleta'}
          </Text>
        </View>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            
          <TouchableOpacity
            style={styles2.edit}
            >
            <View style={{alignItems: 'center'}}>
              <Text style={styles2.editText}>Seguindo</Text>
            </View>
          </TouchableOpacity>
          {/*
        
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              borderRadius: 10,
              width: 120,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0098fd',
              marginLeft: 10,
            }}
            >
              <Text style={styles.butonText}>Seguindo</Text>
          </TouchableOpacity>
          */}

          <TouchableOpacity 
            style={styles2.icon}            
            onPress={() => navigation.navigate('MessageScreen')}>  
            <Ionicons name="trophy-outline" size={24} color="white" />
          </TouchableOpacity>
          
        </View>
      </SafeAreaView>




{/*    

      <ProfilBar />
      <Bio route={route.params} />

      <Highlighs />       
      <TopTabNavigator />
      */}
    </Container>
  );
};
export default Search_details;
