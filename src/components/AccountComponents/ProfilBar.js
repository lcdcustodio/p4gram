import React, {useRef} from 'react';
import {
  Image,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

//---------------------
import { auth } from '../../services/config_firebase';
//---------------------


const ProfilBar = ({route}) => {

  console.log('ProfilBar');
  console.log(route);
  //console.log(route.username);

  const bottomSheet = useRef();
  const bottomSheet2 = useRef();
  const navigation = useNavigation();

  const onLogout = () => {
    auth.signOut();
  }    


  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.left}>
                 
        <Feather name="lock" size={18} color="white" />
        <Text style={styles.header}>{route.username}</Text>
        {/* 
        <Text style={styles.header}>{route.username}</Text>
        */}
        <Image
          source={require('../../../assets/images/down.png')}
          style={{width: 18, height: 18}}
        />
        {/* */}
      </View>

      <View style={styles.right}>
        <TouchableOpacity onPress={() => bottomSheet2.current.show()}>
          <FontAwesome
            name="plus-square-o"
            size={24}
            color="white"
            style={{marginLeft: 30}}
          />
        </TouchableOpacity>
        <BottomSheet
          hasDraggableIcon
          ref={bottomSheet2}
          height={300}
          sheetBackgroundColor="#262626">
          <View style={{alignItems: 'center', marginTop: 15}}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
              Criar
            </Text>
          </View>
          <View style={styles.line} />

          <View style={{marginLeft: 15, marginTop: 15}}>
            <TouchableOpacity
                style={styles.sheet2}
                onPress={() => {
                  navigation.navigate('NewGroup');
                  bottomSheet2.current.close();  
                }}>
                  {/*
                  navigation.navigate('EditProfile');
                  */}

              <Ionicons name="people" size={28} color="white" />              
              <Text style={styles.label}>Grupo</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.sheet2}
                onPress={() => {                
                  Alert.alert('Em construção.');
                }}>
              
              <Ionicons name="game-controller" size={28} color="white" />
              <Text style={styles.label}>Partida</Text>
            </TouchableOpacity>
            {/*  
            <View style={styles.sheet2}>
              <Image
                source={require('../../../assets/images/stories.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Desafio</Text>
            </View>
            <View style={styles.line} />
            
            */}

            <TouchableOpacity
              style={styles.sheet2}
              onPress={() => {                
                Alert.alert('Em construção. Após MVP. Utilizar algoritmo de recommendação (AI/ML).');
              }}>
              
              <Ionicons name="flame" size={28} color="white" />
              <Text style={styles.label}>Desafio</Text>
            </TouchableOpacity>
            {/*   
            <TouchableOpacity
              style={styles.sheet2}
              onPress={() => {                
                Alert.alert('Em construção. Após MVP.');
              }}>
              
              <Ionicons name="fitness" size={28} color="white" />
              <Text style={styles.label}>Treino</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sheet2}
              onPress={() => {                
                Alert.alert('Em construção. Após MVP.');
              }}>
              
              <Ionicons name="trophy" size={28} color="white" />
              <Text style={styles.label}>Torneio</Text>
            </TouchableOpacity>


            
            <View style={styles.sheet2}>
              <Image
                source={require('../../../assets/images/highlight-story.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Treino</Text>
            </View>
            
            <View style={styles.sheet2}>
              <Image
                source={require('../../../assets/images/live.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Torneio</Text>
            </View>
            */}
            {/*
            <View style={styles.sheet2}>
              <Image
                source={require('../../../assets/images/book.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Guia</Text>
            </View>
            */}
          </View>
        </BottomSheet>

        <BottomSheet
          hasDraggableIcon
          ref={bottomSheet}
          height={200}
          sheetBackgroundColor="#262626">
          <View style={{marginTop: 15, marginLeft: 5}}>
            <TouchableOpacity
              style={styles.sheet}
              onPress={() => {
                navigation.navigate('Settings');
                bottomSheet.current.close();
              }}>
              <Ionicons name="settings-outline" size={28} color="white" />
              <Text style={styles.label}>Configurações</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sheet}
              onPress={() => {
                onLogout();
                bottomSheet.current.close();
              }}>
              <Ionicons name="log-out-outline" size={28} color="white" />
              <Text style={styles.label}>Sair da conta</Text>
            </TouchableOpacity>

            {/*   
            <View style={styles.sheet}>

              <Ionicons name="trophy" size={28} color="white" />
              <Text style={styles.label}>Ranking</Text>
            </View>
            
            <View style={styles.sheet}>
              <Image
                source={require('../../../assets/images/time.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Itens Arquivados</Text>
            </View>

            <View style={styles.sheet}>
              <Image
                source={require('../../../assets/images/qr-code.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>QR code</Text>
            </View>

            <View style={styles.sheet}>
              <Feather name="bookmark" size={28} color="white" />
              <Text style={styles.label}>Salvos</Text>
            </View>

            <View style={styles.sheet}>
              <AntDesign name="bars" size={28} color="white" />
              <Text style={styles.label}>Amigos Próximos</Text>
            </View>

            <View style={styles.sheet}>
              <Image
                source={require('../../../assets/images/heart.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Informações COVID-19</Text>
            </View>
            */}
          </View>
        </BottomSheet>
        {/*   
        <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}>
          <Ionicons name="trophy" size={24} color="white" />
        </TouchableOpacity>        
        */}
        <TouchableOpacity onPress={() => bottomSheet.current.show()}>
          <FontAwesome name="bars" size={24} color="white" />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  body: {
    height: '7%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '43%',
    //justifyContent: 'space-around',
    marginLeft: 5,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '25%',
    marginRight: 10,
  },
  header: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    marginRight: 5,
    marginLeft: 5,
  },
  icon: {
    width: 28,
    height: 28,
  },
  line: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#3a3a3a',
    marginTop: 10,
  },
  sheet: {
    backgroundColor: '#262626',
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sheet2: {
    backgroundColor: '#262626',
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 15,
  },
});
export default ProfilBar;
