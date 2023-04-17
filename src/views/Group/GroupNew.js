import React, {useRef, useState} from 'react';
import {
  Image,  
  SafeAreaView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';

import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {TextInput, HelperText } from 'react-native-paper';
import { Alerts } from '../../components/Alerts/Alerts';
import { auth } from '../../services/config_firebase';
import { onRegisterGroup, userNameAvailable } from '../../services/request_firebase';

import DefaultImage from '../../../assets/images/ftv2.png';

import styles from './GroupNew.style';
import styles2 from '../Group/BottomSheet.style';


const GroupNew = () => {
  const [groupName, setGroupName] = useState('');
  const [groupUserName, setGroupUserName] = useState('');  
  //----------
  const [isClosedGroup, setIsClosedGroup] = useState(false);
  const [isPrivacySelected, setIsPrivacySelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);  
  //----------
  const [statusGroupUserNameError, setStatusGroupUserNameError] = useState('');
  const [msgGroupUserNameError, setMsgGroupUserNameError] = useState('');

  const [msgError, setMsgError] = useState('');
  const [statusError, setStatusError] = useState('');

  const [groupUserNameError, setGroupUserNameError] = useState(false);
  //----------  
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  const bottomSheet = useRef();

  

  const chooseFromLibrary = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
    }).then(images => {
      setImage(images?.path);      
    });
  };

  async function onCreateGroup(){

    console.log('onCreateGroup')

    if(groupName == '' || groupName == null){
      
      setMsgError('Digite um nome para o Grupo');
      setStatusError('all');  

    } else if(groupUserName == '' || groupUserName == null){
      
      setMsgError('Digite um nome de usuário para o Grupo');
      setStatusError('all');       
      
    } else if(!isPrivacySelected){

      setMsgError('Escolha a privacidade');
      setStatusError('all');       

    } else if(groupUserNameError){  
  
      setMsgError('Nome de usuário: ' + msgGroupUserNameError);
      setStatusError('all');  

      
    
    }else {
      setIsLoading(true)
      const resCheckUserName = await userNameAvailable(groupUserName);
      console.log('resCheckUserName')
      console.log(resCheckUserName)

      if (resCheckUserName == 'success'){
        //setIsLoading(false)
        
        const result = await onRegisterGroup(groupUserName, groupName, image, isClosedGroup)
        //*
        //const result = await onRegisterGroup(groupUserName, groupName, image, auth.currentUser.uid);        

        if (result == 'success'){
          console.log(result)
          setMsgError('Grupo cadastrado com sucesso!');
          setStatusError('all');
          setIsLoading(false);
          navigation.goBack()
        } else {
          console.log(result)
          setMsgError(result);
          setStatusError('all');
          setIsLoading(false);
        }
        //*/


      }  else{
        console.log('resCheckUserName')
        console.log(resCheckUserName)
        setMsgError(resCheckUserName);
        setStatusError('all');
        setIsLoading(false);
      }  


    }

  }

  function typeUserName(input){

    console.log(input)

    setGroupUserName(input)

    const regexUserName = /^[a-z][a-z0-9\.]{1,20}$/;
    if(input.length < 6 || input.length > 10){    

      setMsgGroupUserNameError('Deve ter de 6 à 10 caracteres');
      setGroupUserNameError(true);
      setStatusGroupUserNameError('username');  

    } else if(!regexUserName.test(input)){  
    
      setMsgGroupUserNameError('Use apenas letras minúsculas, números, sublinhados e pontos.');
      setGroupUserNameError(true);
      setStatusGroupUserNameError('username');  

    } else{
      setMsgError('');
      setGroupUserNameError(false);
      setStatusGroupUserNameError('');  

    }

  }  

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
                onCreateGroup();
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

        <View style={styles.inputContainer}>
        
          <TextInput
                theme={{colors: {text: 'white'}}}
                placeholder="Nome"
                onChangeText={item => setGroupName(item)}
                placeholderTextColor="grey"
                selectionColor="grey"
                style={styles.textInput}
                activeOutlineColor="grey"
                activeUnderlineColor="#3a3a3a"
                
              />

            <View style={{marginTop:5,marginBottom:5}}></View>

            <TextInput
              theme={{colors: {text: 'white'}}}
              placeholder="Nome de usuário"
              placeholderTextColor="grey"
              onChangeText={itemP => typeUserName(itemP)}
              style={styles.textInput}
              selectionColor="grey"
              activeUnderlineColor="#3a3a3a"
              activeOutlineColor="#3a3a3a"
            />

            <HelperText 
              type="error" 
              style={{
                color: 'white'
              }}
              visible={statusGroupUserNameError == 'username'}>
              {msgGroupUserNameError}
            </HelperText>

            {/*  
            <View style={styles2.line}></View>            
            */}
            

            <View style={styles.keyboardView}>
              
              {!isLoading ? (                
		              <Text style={styles.inputLabel2}>Privacidade</Text>          
                ) :(
		              <Text style={styles.inputLabel2}>Processando...</Text>                                    
                )
              }              
              
              <TouchableOpacity
                style={styles.position_btn}
                onPress={() => {bottomSheet.current.show()}}>              

                {!isPrivacySelected ? (                
                  <View style={{alignItems: 'center',flexDirection: 'row'}}>                    
                    <Text style={styles.editText2}>Selecione</Text>
                  </View>
                ) :
                  (
                    !isClosedGroup ? (                                      

                      isLoading ? (

                        <ActivityIndicator size="large" color="#ffffff" />

                      ) :(

                        <View style={{alignItems: 'center',flexDirection: 'row'}}>
                          <Ionicons name="lock-open-outline" size={24} color="white" />
                          <Text style={styles.editText2}>Grupo Aberto</Text>
                        </View>
                        
                      )                    
      

                    ) :
                      (

                      isLoading ? (

                        <ActivityIndicator size="large" color="#ffffff" />

                      ) :(
                        <View style={{alignItems: 'center',flexDirection: 'row'}}>
                          <Ionicons name="lock-closed-outline" size={24} color="white" />
                          <Text style={styles.editText2}>Grupo Fechado</Text>
                        </View>
                        
                      )                            
                    )
                )}


              </TouchableOpacity>   



            </View>  


        </View>

        <BottomSheet
          hasDraggableIcon
          ref={bottomSheet}
          height={250}
          sheetBackgroundColor="#262626">
          <View style={{alignItems: 'center', marginTop: 15}}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              Privacidade
            </Text>
          </View>
          <View style={styles2.line} />

          <View style={{marginLeft: 15, marginTop: 15}}>
            <TouchableOpacity
                style={styles2.sheet2}
                onPress={() => {
                  //setPrivacy('Grupo Aberto');
                  setIsPrivacySelected(true)
                  setIsClosedGroup(false)
                  //console.log(privacy);
                  bottomSheet.current.close();  
                }}>

              <Ionicons name="lock-open-outline" size={42} color="white" />              
              <View>                
                  <Text style={styles2.label2}>Grupo Aberto</Text>
                  <Text style={styles2.label3}>Qualquer um pode seguir o grupo</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles2.sheet2}
                onPress={() => {                
                  //setPrivacy('Grupo Fechado');
                  setIsPrivacySelected(true)
                  setIsClosedGroup(true)
                  //console.log(privacy);
                  bottomSheet.current.close();  
                }}>
              
              <Ionicons name="lock-closed-outline" size={42} color="white" />
              <View>                
                  <Text style={styles2.label2}>Grupo Fechado</Text>
                  <Text style={styles2.label3}>Você aprova as solicitações para seguir o grupo</Text>
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheet>
  
        
      </View>

      <Alerts
        msg={msgError}
        error={statusError == 'all'}
        setError={setStatusError}
      />            

    </SafeAreaView>
  );
};

export default GroupNew;
