import React, {useState, useRef, useEffect} from 'react';
import {Image, 
        Text, 
        TouchableOpacity, 
        ActivityIndicator,
        SafeAreaView,
        View} from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './Register.style';
import styles2 from '../Group/BottomSheet.style';
//--------
import { Alerts } from '../../components/Alerts/Alerts';
import { onRegisterUser, userNameAvailable } from '../../services/request_firebase';


import ImagePicker from 'react-native-image-crop-picker';

import DefaultImage from '../../../assets/images/ftv.png';
import DefaultImage2 from '../../../assets/images/ftv2.png';
import AntDesign from 'react-native-vector-icons/AntDesign';
//--------


//--------

const Register3 = (props) => {
//function Register3(props) {  

  const [position, setPosition] = useState('Selecione');
  const [level, setLevel] = useState('Selecione');
  const [ct, setCt] = useState('Selecione');

  const [statusError, setStatusError] = useState('');
  const [msgError, setMsgError] = useState('');

  const [image, setImage] = useState(null);
  const bottomSheet1 = useRef();
  const bottomSheet2 = useRef();
  const bottomSheet3 = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingData, setIsUpdatingData] = useState(false);  
  //------------------

  console.log('props')
  console.log(props)

  //------------------
  /*

  const { dispatch } = props
  
  useEffect(() => {
  
    
    console.log('-----------------------')
    console.log('useEffect - Register3')
    console.log('-----------------------')
      
    
      */
    /*
    return (() =>{

      if (isUpdatingData){        
        console.log('-----------------------')
        console.log('useEffect - Register3')
        console.log('-----------------------')
    
      }
  
    })
    */ 
  
 // },[isLoading])


  const chooseFromLibrary = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
    }).then(images => {
      setImage(images?.path);
      
    });
  };


  async function onSignUp3(){

    console.log('onSignUp3')

    if (image === null){
      setImage(props.route.params.image)
    } 

    

    if (position === 'Selecione' || level === 'Selecione' || ct === 'Selecione'){

      setMsgError('Dados Futevôlei: favor preencher todos os campos');      
      setStatusError('all');
      
    } else {
      setIsLoading(true)

      const resCheckUserName = await userNameAvailable(props.route.params.username);
      console.log('resCheckUserName')
      console.log(resCheckUserName)

      if (resCheckUserName == 'success'){

        const result = await onRegisterUser(props.route.params.email, 
          props.route.params.password,props.route.params.username,
          props.route.params.name, image, position, level, ct);

        if (result == 'success'){

          //setIsUpdatingData(true)

          //setInterval(() => { console.log(new Date().getSeconds().toString())},5000)
          //console.log(new Date().getSeconds().toString())

          console.log('setIsUpdatingData(true)')
          setMsgError('Usuário cadastrado com sucesso!');
          setStatusError('all');
          setIsLoading(false);

          //-----------------
          //console.log('props.navigation.close()')
          //props.navigation.close();

          //-----------------

        } else {
          console.log(result)
          setMsgError(result);
          setStatusError('all');
          setIsLoading(false);
        }

      } else{
        console.log('resCheckUserName')
        console.log(resCheckUserName)
        setMsgError(resCheckUserName);
        setStatusError('all');
        setIsLoading(false);

      }  
    }

  } 

  return (
    <SafeAreaView style={styles.body}>
      <View style={{margin: 10}}>
        <View style={styles.topContainer}>
          <View style={styles.left}>
            {!isLoading ? (
              <TouchableOpacity onPress={() => props.navigation.goBack()}>            
                <AntDesign
                  name="arrowleft"
                  size={32}
                  color="white"                
                  style={styles.icon}
                />
              </TouchableOpacity>
            ): (
              <TouchableOpacity onPress={() => setIsLoading(false)}>                            
                <AntDesign
                  name="arrowleft"
                  size={32}
                  color="grey"                
                  style={styles.icon}
                />
              </TouchableOpacity>

            )}  
            {/* */}
            <Text style={styles.label}>Dados Futevôlei</Text>
            
            
          </View>
          {/*
          <View style={styles.right}>
            <TouchableOpacity
              onPress={() => {
              //props.navigation.goBack();
              onSignUp();
              }}>
              <AntDesign
                name="check"
                size={32}
                color="#0098fd"
                style={{marginRight: 10}}
              />
            </TouchableOpacity>
          </View>
          */}
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
        {/*  
        <View style={styles.inputContainer}>
        <View style={styles.left}>
        </View>  
        */}
        <View style={styles.keyboardView}>
        
        
          <Text style={styles.inputLabel}>Posição em quadra</Text>
        
          
            <TouchableOpacity
              style={styles.position_btn}
              onPress={() => {bottomSheet1.current.show();}}>              
              <View style={{alignItems: 'center'}}>
                <Text style={styles.editText}>{position}</Text>
              </View>
            </TouchableOpacity>
          
          

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

            

            <TouchableOpacity
              onPress={() => onSignUp3()}
              style={styles.login}>

              {isLoading ? (                
                  <ActivityIndicator size="large" color="#ffffff" />                
              ) :
                (
                  <Text style={styles.editText}>Cadastrar</Text>
              )}

            </TouchableOpacity>

            {isLoading ? (                
                  <Text style={styles.inputLabel}>Processando...</Text>
              ) :
                (
                  <Text style={styles.inputLabel}></Text>
              )}
            

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
/*
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})
export default connect(mapStateToProps, null)(Register3);    
*/
export default Register3;
