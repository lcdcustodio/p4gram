import React, {useRef} from 'react';
import {Image, SafeAreaView, Alert, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomSheet from 'react-native-gesture-bottom-sheet';
const defaultImage = require('../../storage/images/ftvblue_01.jpg');
const defaultImage2 = require('../../storage/images/dez_01.png');

import styles from './AccountComponents.style';
import styles2 from '../../views/Message/styles';

//---------------------
import { connect } from 'react-redux'
//---------------------

//const Bio = ({route}) => {
function Bio(props) {
  const navigation = useNavigation();
  const bottomSheet3 = useRef();
   
  console.log('-bio-');
  //console.log(props);
  {/* */}
  return (
    <SafeAreaView>
      <View style={styles.bioContainer}>
        <Text style={styles.userName}>{props.currentUser.name}</Text>

        <Text style={styles.bio}>
          {props.currentUser.level}
        </Text>
      </View>

      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={styles.edit}
          onPress={() => navigation.navigate('EditProfile')}>
              {/*
              name: 'EditProfile',
              params: {
                username: route.username,
                name: route.name,                  
                image: route.image,                
              }})}>
             */}
          <View style={{alignItems: 'center'}}>
            <Text style={styles.editText}>Editar Perfil</Text>
          </View>
        </TouchableOpacity>
         
        <TouchableOpacity 
          style={styles.icon}            
          onPress={() => bottomSheet3.current.show()}>
          <Ionicons name="people-outline" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.icon}            
          onPress={() => {                
            Alert.alert('Em construção');
          }}>
          <Ionicons name="trophy-outline" size={24} color="white" />
        </TouchableOpacity>

        <BottomSheet
          hasDraggableIcon
          ref={bottomSheet3}
          height={450}
          sheetBackgroundColor="#262626">
          <View style={{alignItems: 'center', marginTop: 15}}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              Grupos
            </Text>
          </View>
          <View style={styles.line} />

          <View style={{marginLeft: 15, marginTop: 15}}>

            <TouchableOpacity
              style={styles.sheet2}
              onPress={() => {                
                Alert.alert('Em construção');
              }}>
              <View style={styles2.messageContainer}>
                  <Image style={styles2.image} source={defaultImage2} />
                  <View style={{marginLeft: 10}}>
                    <Text style={styles2.user}>Dez Futebol e Clube</Text>                    
                    <Text style={styles2.message}>1400 pontos</Text>
                  </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sheet2}
              onPress={() => {                
                Alert.alert('Em construção');
              }}>
              <View style={styles2.messageContainer}>
                  <Image style={styles2.image} source={defaultImage} />
                  <View style={{marginLeft: 10}}>
                    <Text style={styles2.user}>Ftv Blue</Text>                    
                    <Text style={styles2.message}>1220 pontos</Text>
                  </View>
                </View>
            </TouchableOpacity>

          </View>
        </BottomSheet>

        
      </View>

    </SafeAreaView>
  );
};
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})

export default connect(mapStateToProps, null)(Bio);    

//export default Bio;
