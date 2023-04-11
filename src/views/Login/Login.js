import React, {useState} from 'react';
import {Image, 
         Text, 
         TouchableOpacity, 
         ActivityIndicator,
         View} from 'react-native';

import {TextInput} from 'react-native-paper';

import Container from '../../components/Container/Container';
import Content from '../../components/Content/Content';

import styles from './Login.styles';
//--------
import { Alerts } from '../../components/Alerts/Alerts';
import { onSingIn } from '../../services/request_firebase';
//--------
const logo = require('../../../assets/images/blueberry_text_logo_rev03.png')


const Login = (props) => {
  const [passwordVisible, setPasswordVisible] = useState(true);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [statusError, setStatusError] = useState('');
  const [msgError, setMsgError] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  /*
  useEffect(() => {
    setSplash(false);
  
  }, [])   
  */
  //*
  async function onLogIn(){
    setIsLoading(true)
    console.log('onLogIn')

    if(email == '' || email == null){
      setIsLoading(false)
      setMsgError('Informe o seu endereço de email');
      setStatusError('all');
      
    } else if(password == '' || password == null){
      setIsLoading(false)
      setMsgError('Digite a sua senha');
      setStatusError('all');
      console.log('password')
    } else {
      
      //setStatusError('all');
      //setMsgError('Processando...')

      const result = await onSingIn(email, password);
      
      if (result == 'error'){
        setIsLoading(false)
        setStatusError('all');
        setMsgError('Seu usuário ou senha está incorreto.')
      } else {

        //setSplash(true);

      }
      setIsLoading(false)
    }    

  } 
  //*/ 

  return (
    <Container insets={{top: true, bottom: true}}>
      <Content>
        <View style={{flex: 1}}>
          <View style={styles.topContainer}>
             
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* 
              <Text style={{color: 'white', opacity: 0.6, fontSize: 14}}>
                Português(Brasil)
              </Text>

              <Image
                source={require('../../../assets/images/down.png')}
                style={{width: 12, height: 12}}
              />
               */}
            </View>
            
            
            <Image
              style={styles.logo}
              source={logo}
            />
            {/*
            {splash ? (
              <Image
                style={styles.logo}
                source={temp}
              />
            ) :
              (
              <Image
                style={styles.logo}
                source={logo}
              />
            )}
            */}

          </View>

          <View style={styles.keyboardView}>
            <TextInput
              theme={{colors: {text: 'white'}}}
              placeholder="endereço de e-mail"
              onChangeText={item => setEmail(item)}
              placeholderTextColor="grey"
              selectionColor="grey"
              style={styles.textInput}
              activeOutlineColor="grey"
              activeUnderlineColor="#3a3a3a"
            />

            <TextInput
              theme={{colors: {text: 'white'}}}
              placeholder="Senha"
              placeholderTextColor="grey"
              onChangeText={itemP => setPassword(itemP)}
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
            {/*
            <Alerts
              msg={msgError}
              error={statusError == 'email'}
              setError={setStatusError}
            />            
            */}    
            <TouchableOpacity
              onPress={() => onLogIn()}
              style={styles.login}
              disabled={email === null && password === null ? true : false}>

              {isLoading ? (
                  <ActivityIndicator size="large" color="#ffffff" />
              ) :
                (
                  <Text style={styles.loginText}>Entrar</Text>
              )}




              {/*  
              <Text style={styles.loginText}>Entrar</Text>
              {isLoading && (
              <ActivityIndicator
                style={{ height: 80 }}
                color="#C00"
                size="large"
              />
              )}
              */}
            </TouchableOpacity>



            {/*
            <TouchableOpacity
              onPress={() => {
                trueEmail === email && truePassword === password
                  ? navigation.reset({
                      index: 0,
                      routes: [{name: 'BottomTab'}],
                    })
                  : Alert.alert('Senha ou nome de usuário incorreto');
              }}
              style={styles.login}
              disabled={email === null && password === null ? true : false}>
              <Text style={styles.loginText}>Entrar</Text>
            </TouchableOpacity>
            */}
            
            <View style={{alignItems: 'center', padding: 10}}>
              <View style={styles.text}>
                <Text style={{fontSize: 12, color: 'grey'}}>
                  Esqueceu a senha?{' '}
                </Text>
                <Text style={styles.help}> Obtenha ajuda para fazer login.</Text>
              </View>
            </View>
            

          </View>

          {/*    
          <View style={styles.bottomContainer}>    
          */}
          <View style={{position: 'absolute', left: 0, right: 0, bottom: 2}}>
            <View style={styles.bottom}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: 12, color: 'grey', marginTop: 15}}>
                  Não tem uma conta?{' '}
                </Text>
                <Text style={{...styles.help, marginTop: 15, marginBottom: 10}}
                      onPress={() => props.navigation.navigate("Register1")} > 
                      Cadastre-se.
                </Text>
              </View>

              <View style={styles.line} />
            </View>
          </View>

          <Alerts
              msg={msgError}
              error={statusError == 'all'}
              setError={setStatusError}
            />            

        </View>
      </Content>
    </Container>
  );
};
export default Login;
