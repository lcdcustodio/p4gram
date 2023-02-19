import React, {useRef, useState} from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';



import DefaultImage from '../../../assets/images/maicon_01.png';
import DefaultImage2 from '../../../assets/images/group-128.png';

import styles from './GroupNew.style';

const GroupNew = () => {
  const [name, setName] = useState('Maicon Souza');
  const [postname, setPostname] = useState('maicon08');  
  const [bio, setBio] = useState('jogador');
  const [image, setImage] = useState();
  const navigation = useNavigation();
  const bottomSheet = useRef();

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
              onPress={() =>
                navigation.navigate({
                  name: 'Account',
                  params: {
                    name: name,
                    bio: bio,
                    image: image,
                  },
                })
              }>
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
            source={image ? {uri: image} : DefaultImage2}
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
            onChangeText={item => setPostname(item)}   
            //placeholder="Ftv Blueberry"
            //placeholderTextColor="grey"      
          />
          {/* */}  
          <View style={styles.line} />
          
          <Text style={styles.inputLabel}>Nome de usuário</Text>          
          <TextInput 
            style={styles.input} 
            onChangeText={item => setPostname(item)}   
            //placeholder="blue.berry"
            //placeholderTextColor="grey"         
          />
          <View style={styles.line} />

          
        </View>

        <TouchableOpacity
              //onPress={() => {
              //  Alert.alert('Senha ou nome de usuário incorreto');
              //}}
              style={styles.create}>
              
              <Text style={styles.createText}>Privacidade</Text>
            </TouchableOpacity>

        
      </View>

    </SafeAreaView>
  );
};

export default GroupNew;
