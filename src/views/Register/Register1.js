import React, {useState} from 'react';
import {Image, 
        Text, 
        TouchableOpacity, 
        SafeAreaView,
        View} from 'react-native';
import {TextInput, HelperText } from 'react-native-paper';


//--------
import { Alerts } from '../../components/Alerts/Alerts';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';

import DefaultImage from '../../../assets/images/ftv.png';
import styles from './Register.style';
//--------


const Register1 = (props) => {

  const [userNameError, setUserNameError] = useState(false);
  const [name, setName] = useState(null);
  const [userName, setUserName] = useState(null);

  const [statusError, setStatusError] = useState('');
  const [statusUserNameError, setStatusUserNameError] = useState('');
  const [msgError, setMsgError] = useState('');
  const [msgUserNameError, setMsgUserNameError] = useState('');

  const [image, setImage] = useState(null);


  
  //------------------
 
  //------------------

  const chooseFromLibrary = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
    }).then(images => {
      setImage(images?.path);
      
    });
  };

  function typeUserName(input){

    console.log(input)

    setUserName(input)

    //const regexUserName = /^[a-z][a-z0-9\.]{1,20}$/;
    const regexUserName = /^[a-z][a-z0-9\._]{1,20}$/;
    //const minLengthRegExp   = /.{6,10}/;
    //const maxLengthRegExp   = /.{,10}/;
    //const regexUserName = /^[a-z][a-z0-9\.]$/;
    //console.log(minLengthRegExp.test(input))
    //console.log(maxLengthRegExp.test(input))

    //if(!minLengthRegExp.test(input)){  
    if(input.length < 6 || input.length > 10){    

      setMsgUserNameError('Deve ter de 6 à 10 caracteres');
      setUserNameError(true);
      setStatusUserNameError('username');  


    } else if(!regexUserName.test(input)){  
  
      //setMsgError('Use seis ou mais caracteres com  uma combinação de letras letras minúsculas (a-z), números (0-9) e ponto (.)');
      //setMsgUserNameError('Você pode usar letras minúsculas, números e pontos finais');
      setMsgUserNameError('Use apenas letras minúsculas, números, sublinhados e pontos.');
      setUserNameError(true);
      setStatusUserNameError('username');  

    } else{
      setMsgError('');
      setUserNameError(false);
      setStatusUserNameError('');  

    }

  }  
  function onSignUp1(){

    console.log('onSignUp1')    

    if(userName == '' || userName == null){
      
      setMsgError('Informe o seu nome de usuário');
      setStatusError('all');        
    
    } else if(userNameError){  
  
      setMsgError('Nome de usuário: ' + msgUserNameError);
      setStatusError('all');  

    } else if(name == '' || name == null){
      
      setMsgError('Digite o seu nome');
      setStatusError('all');  
    

    } else {

      props.navigation.navigate({
        name: 'Register2',
        params: {
          username: userName,
          name: name,                  
          image: image,
        },
      });

    }  




  } 

  return (
    <SafeAreaView style={styles.body}>
      <View style={{margin: 10}}>
        <View style={styles.topContainer}>
          <View style={styles.left}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <AntDesign
                name="close"
                size={32}
                color="white"
                style={styles.icon}
              />
            </TouchableOpacity>
            {/* */}
            <Text style={styles.label}>Dados Pessoais</Text>
            
          </View>

          <View style={styles.right}>
            <TouchableOpacity
              onPress={() => {
              //props.navigation.goBack();
              onSignUp1();
              }}>
              <AntDesign
                name="arrowright"
                size={32}
                color="white"
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
            <Text style={styles.change}> Foto do perfil</Text>
          </TouchableOpacity>

        </View>
        {/*      
        <View style={styles.inputContainer}>
        <View style={styles.keyboardView}>
        */}
        <View style={styles.inputContainer}>
        
          <TextInput
                theme={{colors: {text: 'white'}}}
                placeholder="Nome"
                onChangeText={item => setName(item)}
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
              visible={statusUserNameError == 'username'}>
              {msgUserNameError}
            </HelperText>              

        </View>
        
      </View>

      <Alerts
        msg={msgError}
        error={statusError == 'all'}
        setError={setStatusError}
      />            

    </SafeAreaView>
  );
};

export default Register1;
