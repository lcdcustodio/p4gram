import React from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './AccountComponents.style';

const Bio = ({route}) => {
  const navigation = useNavigation();
   
  console.log('bio');
  console.log(route);
  {/* */}
  return (
    <SafeAreaView>
      <View style={styles.bioContainer}>
        <Text style={styles.userName}> {route ? route.name : 'Anderson Águia'}</Text>
        {/* 
        <Text style={styles.userName}> {route ? route.name : 'Anderson Águia'}</Text>
        */}
        <Text style={styles.bio}>
          {route ? route.bio : 'Atleta'}
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
          <View style={{alignItems: 'center'}}>
            <Text style={styles.editText}>Editar Perfil</Text>
          </View>
        </TouchableOpacity>
         
        <TouchableOpacity 
          style={styles.icon}            
          onPress={() => navigation.navigate('MessageScreen')}>  
          <Ionicons name="people-outline" size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.icon}            
          onPress={() => navigation.navigate('MessageScreen')}>  
          <Ionicons name="trophy-outline" size={24} color="white" />
        </TouchableOpacity>
        
      </View>

    </SafeAreaView>
  );
};

export default Bio;
