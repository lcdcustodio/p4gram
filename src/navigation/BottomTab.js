import React from 'react';
import {Image, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Discover from '../views/Discover/Discover';
import Search from '../views/Search/Search';

import AccountScreen from './AccountScreen';
import HomeScreen from './HomeScreen';
import StoreScreen from './StoreScreen';
import MessageScreen from './MessageScreen';
import SearchScreen from './SearchScreen';


const Tab = createBottomTabNavigator();

//-----------
import { auth } from '../services/config_firebase';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser,fetchUserPosts, fetchUserFollowing, clearData } from '../redux/actions/index';

//-----------

//const BottomTab = () => {

export class BottomTab extends React.Component {
  componentDidMount() {
      //*
      this.props.clearData();
      this.props.fetchUser();
      this.props.fetchUserPosts();
      this.props.fetchUserFollowing();
      //*/
  }

  render (){
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            if (route.name === 'HomeScreen') {
              return focused ? (
                <Foundation name="home" size={32} color="white" />
              ) : (
                <Image
                  source={require('../../assets/images/home.png')}
                  style={{width: 25, height: 25}}
                />
              );
            }
            if (route.name === 'SearchScreen') {
              return focused ? (
                <Ionicons name="search" size={28} color="white" />
              ) : (
                <Ionicons name="search-outline" size={28} color="white" />                
                
              );


            }
            if (route.name === 'Discover') {
              return <Feather name="video" size={28} color="white" />;
            }
            if (route.name === 'AccountScreen') {
              return focused ? (
                <Ionicons name="person" size={28} color="white" />
              ) : (
                <Ionicons name="person-outline" size={28} color="white" />                
              );

              
              /*
              return <Feather name="search" size={28} color="white" />;
              return <Feather name="user" size={30} color="white" />;
              return (
                <Avatar.Image
                  size={28}
                  source={require('../../assets/images/maicon_01.png')}
                />
              );
              */
            }
          },
          tabBarStyle: {backgroundColor: 'black'},
          tabBarShowLabel: false,
          headerShown: false,
        })}>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />      
        <Tab.Screen name="SearchScreen" component={SearchScreen} />
        {/*
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Discover" component={Discover} />
        <Tab.Screen name="StoreScreen" component={StoreScreen} />
        */}
        <Tab.Screen name="Discover" component={Discover} />
        
        <Tab.Screen name="AccountScreen" component={AccountScreen} navigation={this.props.navigation}/>
        {/*
        <Tab.Screen name="AccountScreen" component={AccountScreen} navigation={this.props.navigation}
            listeners={({ navigation }) => ({
                tabPress: event => {
                    event.preventDefault();
                    navigation.navigate("AccountScreen", { uid: auth.currentUser.uid })
                }
            })}/>
        */}

      </Tab.Navigator>
    )
  }  
}
//export default BottomTab;
//*
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser
})

console.log('----------------------')
console.log('this.props - BottonTab')
console.log(this.props)
console.log('----------------------')

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts, fetchUserFollowing, clearData  }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(BottomTab);
//*/