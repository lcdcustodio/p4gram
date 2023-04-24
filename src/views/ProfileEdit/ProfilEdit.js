import React, {useRef, useState, useEffect} from 'react';
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


import DefaultImage from '../../../assets/images/ftv.png';
import DefaultImage2 from '../../../assets/images/ftv2.png';
import {TextInput, HelperText } from 'react-native-paper';

import styles from './ProfilEdit.style';
//---------------------
import styles2 from './BottomSheet.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Alerts } from '../../components/Alerts/Alerts';

import { userNameAvailableProfileEdit, onProfileEdit } from '../../services/request_firebase';
//---------------------
import { fetchUser } from '../../redux/actions';
//import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

//---------------------

//const ProfilEdit = () => {
function ProfilEdit(props) {  
  const [name, setName] = useState(props.currentUser.name);
  const [userName, setUserName] = useState(props.currentUser.username);  
  const [position, setPosition] = useState(props.currentUser.position);
  const [image, setImage] = useState(props.currentUser.image);
  const [level, setLevel] = useState(props.currentUser.level);
  const [ct, setCt] = useState(props.currentUser.ct);

  //----------
  const [isLoading, setIsLoading] = useState(false);  
  const [isUpdatingData, setIsUpdatingData] = useState(false);  

  const [statusError, setStatusError] = useState('');
  const [statusUserNameError, setStatusUserNameError] = useState('');
  const [msgError, setMsgError] = useState('');
  const [msgUserNameError, setMsgUserNameError] = useState('');
  const [userNameError, setUserNameError] = useState(false);

  //----------

  const navigation = useNavigation();
  const bottomSheet1 = useRef();
  const bottomSheet2 = useRef();
  const bottomSheet3 = useRef();


  console.log('ProfilEdit')
  //console.log(props)

  const { dispatch } = props

//*
  useEffect(() => {
    
    console.log('-----------------------')
    console.log('lala')
    console.log('-----------------------')
    /*
    dispatch(fetchUser())
    */

    return (() =>{

      if (isUpdatingData){
        console.log("Cleanup..");
        console.log('-----------------------')
        console.log('useEffect - ProfilEdit')
        console.log('-----------------------')
        dispatch(fetchUser())
      }
  
    }) 
  
  },[isUpdatingData])

  //},[isLoading])
//*/
  const chooseFromLibrary = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
    }).then(images => {
      setImage(images?.path);
    });
  };

  async function onUpdateProfile(){

    console.log('onUpdateProfile')
    if(name == '' || name == null){
      
      setMsgError('Digite o nome');
      setStatusError('all');  

    } else if(userName == '' || userName == null){
      
      setMsgError('Digite um nome de usuário');
      setStatusError('all');       
      
    } else if(userNameError){  
  
      setMsgError('Nome de usuário: ' + msgUserNameError);
      setStatusError('all');  
    }else {
      setIsLoading(true)
      const resCheckUserName = await userNameAvailableProfileEdit(userName);
      console.log('resCheckUserName')
      console.log(resCheckUserName)

      if (resCheckUserName == 'success'){
        //setIsLoading(false)
        
        //const result = await onRegisterGroup(groupUserName, groupName, image, isClosedGroup)
        const result = await onProfileEdit(userName, name, ct, level, position, image)

        //const result = 'success'

        if (result == 'success'){

          setIsUpdatingData(true)

          console.log(result)
          setMsgError('Perfil editado com sucesso!');
          setStatusError('all');
          setIsLoading(false);
          //--------------
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

    setUserName(input)

    const regexUserName = /^[a-z][a-z0-9\._]{1,20}$/;
    if(input.length < 6 || input.length > 10){    

      setMsgUserNameError('Deve ter de 6 à 10 caracteres');
      setUserNameError(true);
      setStatusUserNameError('username');  

    } else if(!regexUserName.test(input)){  
    
      setMsgUserNameError('Use apenas letras minúsculas, números, sublinhados e pontos.');
      setUserNameError(true);
      setStatusUserNameError('username');  

    } else{
      setMsgUserNameError('');
      setUserNameError(false);
      setStatusUserNameError('');  

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
            <Text style={styles.label}>Editar Perfil</Text>
          </View>

          <View style={styles.right}>
            <TouchableOpacity
              onPress={() => {
                onUpdateProfile();
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
            <Text style={styles.change}>Alterar foto do perfil</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.inputContainer}>
          {/* */}    
          <TextInput 
                theme={{colors: {text: 'white', placeholder: 'white'}}}                
                onChangeText={item => setName(item)}
                selectionColor="grey"
                style={styles.textInput2}
                activeOutlineColor="white"
                activeUnderlineColor="#3a3a3a"
                mode="outlined"
                value={name}
                label="Nome"/>              

            <View style={{marginTop:5,marginBottom:5}}></View>

            <TextInput 
                theme={{colors: {text: 'white', placeholder: 'white'}}}                
                onChangeText={itemP => typeUserName(itemP)}
                selectionColor="grey"
                style={styles.textInput2}
                activeOutlineColor="white"
                activeUnderlineColor="#3a3a3a"
                mode="outlined"
                value={userName}
                label="Nome de usuário"/>              

            <HelperText 
              type="error" 
              style={{
                color: 'white'
              }}
              visible={statusUserNameError == 'username'}>
              {msgUserNameError}
            </HelperText>

            <View style={styles.keyboardView}>
              
              {!isLoading ? (                
		              <Text style={styles.inputLabel2}>Posição em quadra</Text>          
                ) :(
		              <Text style={styles.inputLabel2}>Processando...</Text>                                    
                )
              }              
              
              <TouchableOpacity
                style={styles.position_btn}
                onPress={() => {bottomSheet1.current.show()}}>              

                {!isLoading ? (                
                  <View style={{alignItems: 'center',flexDirection: 'row'}}>                    
                    <Text style={styles.editText2}>{position}</Text>
                  </View>

                ) :
                  (
                  
                  <ActivityIndicator size="large" color="#ffffff" />

                )}

                        
              </TouchableOpacity>   




              {/* */}
              <Text style={styles.inputLabel}>Nível</Text>
            
              <TouchableOpacity
                style={styles.position_btn}
                onPress={() => {bottomSheet2.current.show()}}>              
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.editText}>{level}</Text>
                </View>
              </TouchableOpacity>

              <Text style={styles.inputLabel}>Centro de Treinamento</Text>
              
              <TouchableOpacity
                style={styles.position_btn}
                onPress={() => {bottomSheet3.current.show();}}>              
                <View style={{alignItems: 'center'}}>
                  <Text style={styles.editText}>{ct}</Text>
                </View>
              </TouchableOpacity>   
              


            </View>  


        </View>

        <BottomSheet
          hasDraggableIcon
          ref={bottomSheet1}
          height={250}
          sheetBackgroundColor="#262626">
          <View style={{alignItems: 'center', marginTop: 15}}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              Posição em quadra
            </Text>
          </View>
          <View style={styles2.line} />

          <View style={{marginLeft: 15, marginTop: 15}}>
            <TouchableOpacity
                style={styles2.sheet2}
                onPress={() => {
                  //setPrivacy('open');
                  setPosition('Direita');
                  //console.log(privacy);
                  bottomSheet1.current.close();  
                }}>

              <Ionicons name="arrow-forward-circle" size={36} color="white" />              
              <View>                
                  <Text style={styles2.label2}>Direita</Text>
                  
              </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles2.sheet2}
                onPress={() => {                
                  setPosition('Esquerda');
                  //console.log(privacy);
                  bottomSheet1.current.close();  
                }}>
              
              <Ionicons name="arrow-back-circle" size={36} color="white" />                            
              <View>                
                  <Text style={styles2.label2}>Esquerda</Text>
                  
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheet>

        <BottomSheet
          hasDraggableIcon
          ref={bottomSheet2}
          height={250}
          sheetBackgroundColor="#262626">
          <View style={{alignItems: 'center', marginTop: 15}}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              Nível
            </Text>
          </View>
          <View style={styles2.line} />

          <View style={{marginLeft: 15, marginTop: 15}}>
            <TouchableOpacity
                style={styles2.sheet2}
                onPress={() => {
                  setLevel('Iniciante');                  
                  bottomSheet2.current.close();  
                }}>

              <AntDesign name="star" size={36} color="white"/>
              <AntDesign name="staro" size={36} color="white"/>
              <AntDesign name="staro" size={36} color="white"/>
              <View>                
                  <Text style={styles2.label2}>Iniciante</Text>
                  
              </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles2.sheet2}
                onPress={() => {                
                  setLevel('Intermediário');
                  bottomSheet2.current.close();  
                }}>
              
              <AntDesign name="star" size={36} color="white"/>
              <AntDesign name="star" size={36} color="white"/>
              <AntDesign name="staro" size={36} color="white"/>

              <View>                
                  <Text style={styles2.label2}>Intermediário</Text>
                  
              </View>

            </TouchableOpacity>
            <TouchableOpacity
                style={styles2.sheet2}
                onPress={() => {                
                  setLevel('Avançado');
                  bottomSheet2.current.close();  
                }}>
              
              <AntDesign name="star" size={36} color="white"/>
              <AntDesign name="star" size={36} color="white"/>
              <AntDesign name="star" size={36} color="white"/>

              <View>                
                  <Text style={styles2.label2}>Avançado</Text>
                  
              </View>

            </TouchableOpacity>

          </View>
        </BottomSheet>

        <BottomSheet
          hasDraggableIcon
          ref={bottomSheet3}
          height={300}
          sheetBackgroundColor="#262626">
          <View style={{alignItems: 'center', marginTop: 15}}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              Centro de Treinamento
            </Text>
          </View>
          <View style={styles2.line} />

          <View style={{marginLeft: 15, marginTop: 15}}>
          <TouchableOpacity
                style={styles2.sheet2}
                onPress={() => {                
                  setCt('Team Águia');
                  bottomSheet3.current.close();  
                }}>
              
              {/*
              <Ionicons name="football-outline" size={36} color="white" />
              */}

              <Image
                style={styles.image2}
                source={DefaultImage2}
              />              

              <View>                
                  <Text style={styles2.label2}>Team Águia</Text>
                  
              </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles2.sheet2}
                onPress={() => {                
                  setCt('DEZ');
                  bottomSheet3.current.close();  
                }}>
              
              <Image
                style={styles.image2}
                source={DefaultImage2}
              />              


              <View>                
                  <Text style={styles2.label2}>DEZ</Text>
                  
              </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles2.sheet2}
                onPress={() => {                
                  setCt('Outro');
                  bottomSheet3.current.close();  
                }}>
              
              <Image
                style={styles.image2}
                source={DefaultImage2}
              />              

              <View>                
                  <Text style={styles2.label2}>Outro</Text>
                  
              </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles2.sheet2}
                onPress={() => {                
                  setCt('Nenhum');
                  bottomSheet3.current.close();  
                }}>
              
              <Image
                style={styles.image2}
                source={DefaultImage2}
              />              

              <View>                
                  <Text style={styles2.label2}>Nenhum</Text>
                  
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

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})

//const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);
//export default connect(mapStateToProps, mapDispatchProps)(ProfilEdit);    
//export default connect(mapStateToProps, lala)(ProfilEdit);    
export default connect(mapStateToProps, null)(ProfilEdit);    

//export default ProfilEdit;
