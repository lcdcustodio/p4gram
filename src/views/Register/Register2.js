import React, {useState} from 'react';
import {Image, 
        Text, 
        TouchableOpacity, 
        SafeAreaView,        
        Switch,
        View} from 'react-native';
import {TextInput,HelperText} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';


//import styles from './Register.styles_OLD';
import styles from './Register.style';
//--------
import { Alerts } from '../../components/Alerts/Alerts';
import { onSingIn } from '../../services/request_firebase';
import ImagePicker from 'react-native-image-crop-picker';

import DefaultImage from '../../../assets/images/ftv.png';
//--------
const logo = require('../../../assets/images/blueberry_text_logo_rev03.png')

const Register2 = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(true);  
  const [password, setPassword] = useState('');  
  const [email, setEmail] = useState(null);

  const [statusError, setStatusError] = useState('');
  const [msgError, setMsgError] = useState('');

  const [image, setImage] = useState(null);
  //------------------
  const [statusPasswordError, setStatusPasswordError] = useState('');
  const [msgPasswordError, setMsgPasswordError] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  //------------------

  const uppercaseRegExp   = /(?=.*?[A-Z])/;
  const lowercaseRegExp   = /(?=.*?[a-z])/;
  const digitsRegExp      = /(?=.*?[0-9])/;
  const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
  const minLengthRegExp   = /.{8,}/;



  //-------------------

  console.log('props')
  console.log(props.route.params)

  //setImage(props.route.params.image)
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

  function typePassword(input){

    console.log(input)

    setPassword(input)

    const uppercasePassword =   uppercaseRegExp.test(input);
    const lowercasePassword =   lowercaseRegExp.test(input);
    const digitsPassword =      digitsRegExp.test(input);
    const specialCharPassword = specialCharRegExp.test(input);
    const minLengthPassword =   minLengthRegExp.test(input);    

    if(!uppercasePassword){

      setMsgPasswordError('Senha deve conter ao menos um caractere com letra maiúscula');
      setPasswordError(true);
      setStatusPasswordError('password');      

    }else if(!lowercasePassword){

      setMsgPasswordError('Senha deve conter ao menos um caractere com letra minúscula');
      setPasswordError(true);
      setStatusPasswordError('password');      

    }else if(!digitsPassword){

      setMsgPasswordError('Senha deve conter ao menos um dígito numérico');
      setPasswordError(true);
      setStatusPasswordError('password');      

    }else if(!specialCharPassword){

      setMsgPasswordError('Senha deve conter ao menos um símbolo (!@#$%)');
      setPasswordError(true);
      setStatusPasswordError('password');      

    }else if(!minLengthPassword){
      setMsgPasswordError('Senha deve conter ao menos oito caracteres');
      setPasswordError(true);
      setStatusPasswordError('password');      

      
    } else{

      setMsgPasswordError('');
      setPasswordError(false);
      setStatusPasswordError('');

    }



}

  

  function onSignUp2(){

    console.log('onSignUp2')

    const regexEmail = /^[a-z0-9_]+([\.-]?[a-z0-9_]+)*@[a-z0-9]+([\.-]?[a-z0-9]+)*(\.[a-z0-9]+)+$/;  
    


    
    if(email == '' || email == null){
      
      setMsgError('Informe o seu endereço de email');      
      setStatusError('all');
      

    } else if(!regexEmail.test(email)){  
      
      //setMsgError('Seu email ' + '\'' + email + '\'' + ' está com erro na digitação.');
      setMsgError('Digite um endereço de email válido');
      setStatusError('all');  

    } else if(passwordError){  
  
      setMsgError(msgPasswordError);
      setStatusError('all');  


    } else {

      console.log('Register3')

      if (image === null){
        setImage(props.route.params.image)
      } 


      props.navigation.navigate({
        name: 'Register3',
        params: {
          username: props.route.params.username,
          name: props.route.params.name,        
          email: email,
          password: password,
          image: image,
        },
      });      
      

    }  
  }

  /*
  async function onSignUp2(){

    console.log('onSignUp2')

    props.navigation.navigate({
      name: 'Register3',
      params: {
        pass: password,                   
      },
    });


  } 
  */

  return (
    <SafeAreaView style={styles.body}>
      <View style={{margin: 10}}>
        <View style={styles.topContainer}>
          <View style={styles.left}>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <AntDesign
                name="arrowleft"
                size={32}
                color="white"
                style={styles.icon}
              />
            </TouchableOpacity>
            {/* */}
            <Text style={styles.label2}>Email e senha</Text>
            
          </View>

          <View style={styles.right}>
            <TouchableOpacity
              onPress={() => {              
              onSignUp2();
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
              source={props.route.params.image ? {uri: props.route.params.image} : DefaultImage}
            />

            <TouchableOpacity 

              onPress={chooseFromLibrary}>
              <Text style={styles.change}> Foto do perfil</Text>
            </TouchableOpacity>


        </View>
        <View style={styles.inputContainer}>
        
            <TextInput
              theme={{colors: {text: 'white'}}}
              placeholder="Email"
              placeholderTextColor="grey"
              onChangeText={itemP => setEmail(itemP)}
              style={styles.textInput}
              selectionColor="grey"              
              activeUnderlineColor="#3a3a3a"
              activeOutlineColor="#3a3a3a"
            />

            <View style={{marginTop:5,marginBottom:5}}></View>

            <TextInput
              theme={{colors: {text: 'white'}}}
              placeholder="Senha"
              placeholderTextColor="grey"
              onChangeText={itemP => typePassword(itemP)}
              style={styles.textInput}
              selectionColor="grey"
              secureTextEntry={passwordVisible}
              activeUnderlineColor="#3a3a3a"
              activeOutlineColor="#3a3a3a"
              right={
                <TextInput.Icon
                  color={'grey'}
                  name={passwordVisible ? 'eye-off' : 'eye'}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
            />

            <HelperText 
              type="error" 
              style={{
                color: 'white'
              }}
              visible={statusPasswordError == 'password'}>
              {msgPasswordError}
            </HelperText>                
           
          {/*    
           <View style={styles.line} />    

          <Text style={styles.inputLabel}>Nome</Text>
            <TextInput 
              style={styles.input} 
              activeUnderlineColor="#3a3a3a"
              theme={{colors: {text: 'white'}}}
              onChangeText={item => setName(item)}/>            
            
            <View style={styles.line} />
            
            <Text style={styles.inputLabel}>Nome de usuário</Text>
            
            <TextInput 
              style={styles.input} 
              activeUnderlineColor="#3a3a3a"
              theme={{colors: {text: 'white'}}}
              onChangeText={item => setUserName(item)}/>
              
            
            <View style={styles.line} />

            <Text style={styles.inputLabel}>Email</Text>
            
            <TextInput 
              style={styles.input} 
              activeUnderlineColor="#3a3a3a"
              theme={{colors: {text: 'white'}}}
              onChangeText={item => setEmail(item)}/>
              
            
            <View style={styles.line} />
            */}


            {/* 
           <Text style={styles.inputLabel}>Posição em quadra</Text>          
            
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}

              theme="DARK"
              multiple={true}
              mode="BADGE"
              badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
            /> 
            */}       

        </View>
        {/*
        <Text style={styles.label}>Posição em quadra</Text>      

        
         <View style={styles.line} />
        <Text style={styles.label}>Posição em quadra:</Text>
                <View style={styles.topContainer}>
            <View style={styles.left}>
              <Text style={styles.label}>Posição:</Text>
            </View>
            </View>

        <TouchableOpacity
              onPress={() => onLogIn()}
              style={styles.create}>
              <Text style={styles.createText}>Continuar</Text> 
        </TouchableOpacity>
        */}        


        
      </View>

      <Alerts
        msg={msgError}
        error={statusError == 'all'}
        setError={setStatusError}
      />            


    </SafeAreaView>
  );
};

export default Register2;
