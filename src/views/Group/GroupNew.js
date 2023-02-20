import React, {useRef, useState} from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Button,
  View,
} from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';

import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';


import DefaultImage from '../../../assets/images/group-128.png';

import styles from './GroupNew.style';

const GroupNew = () => {
  const [group_name, setGroupName] = useState('tbd');
  const [privacy, setPrivacy] = useState('tbd');
  const [group_postname, setGroupPostname] = useState('tbd');  
  const [bio, setBio] = useState('jogador');
  const [image, setImage] = useState();
  const navigation = useNavigation();
  const bottomSheet = useRef();

  console.log(privacy);

  const chooseFromLibrary = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
    }).then(images => {
      setImage(images?.path);
      //bottomSheet.current.close();
    });
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={{margin: 10}}>
        <View style={styles.topContainer}>
          <View style={styles.left}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="close"
                size={32}
                color="white"
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.label}>Criar Grupo</Text>
          </View>

          <View style={styles.right}>
            <TouchableOpacity
              onPress={() => {
              navigation.goBack();
              console.log(privacy);
              console.log(group_name);
              console.log(group_postname);                            
              }}>
              <AntDesign
                name="check"
                size={32}
                color="#0098fd"
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.profile}>
          <Image
            style={styles.image}
            source={image ? {uri: image} : DefaultImage}
          />

          <TouchableOpacity 

            onPress={chooseFromLibrary}>
            <Text style={styles.change}> Foto do grupo</Text>
          </TouchableOpacity>

        </View>
        {/* */}  
        <View style={styles.inputContainer}>
        
          <Text style={styles.inputLabel}>Nome do grupo</Text>
          <TextInput 
            style={styles.input} 
            onChangeText={item => setGroupName(item)}   
            //placeholder="Ftv Blueberry"
            //placeholderTextColor="grey"      
          />
          {/* */}  
          <View style={styles.line} />
          
          <Text style={styles.inputLabel}>Nome de usuário</Text>          
          <TextInput 
            style={styles.input} 
            onChangeText={item => setGroupPostname(item)}   
            //onChangeText={item => setPostname(item)}   
            //placeholder="blue.berry"
            //placeholderTextColor="grey"         
          />
          <View style={styles.line} />

          
        </View>
        {/*        
        <Text style={styles.inputLabel}>Privacidade</Text>          
        */}
        <TouchableOpacity
              //onPress={() => {
              //  Alert.alert('Senha ou nome de usuário incorreto');
              //}}
              onPress={() => bottomSheet.current.show()}
              style={styles.create}>
              <Text style={styles.createText}>{privacy == 'tbd' ? 'Definir Privacidade' : privacy == 'open' ? 'Grupo Aberto' : 'Grupo Fechado'}</Text> 
        </TouchableOpacity>


        <BottomSheet
          hasDraggableIcon
          ref={bottomSheet}
          height={250}
          sheetBackgroundColor="#262626">
          <View style={{alignItems: 'center', marginTop: 15}}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              Escolher Privacidade
            </Text>
          </View>
          <View style={styles.line} />

          <View style={{marginLeft: 15, marginTop: 15}}>
            <TouchableOpacity
                style={styles.sheet2}
                onPress={() => {
                  setPrivacy('open');
                  console.log(privacy);
                  bottomSheet.current.close();  
                }}>

              <Ionicons name="lock-open-outline" size={48} color="white" />              
              <View>                
                  <Text style={styles.label2}>Grupo Aberto</Text>
                  <Text style={styles.label3}>Qualquer um pode seguir o grupo</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.sheet2}
                onPress={() => {                
                  setPrivacy('closed');
                  console.log(privacy);
                  bottomSheet.current.close();  
                }}>
              
              <Ionicons name="lock-closed-outline" size={48} color="white" />
              <View>                
                  <Text style={styles.label2}>Grupo Fechado</Text>
                  <Text style={styles.label3}>Você aprova as solicitações para seguir o grupo</Text>
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheet>

        
      </View>

    </SafeAreaView>
  );
};

export default GroupNew;
