import React from 'react';
import {View, Image} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
//-----------
import Comment from '../views/Comment/Comment';

import BottomTab from './BottomTab';
import EditProfile from './EditProfile';
import MessageScreen from './MessageScreen';

import NewGroup from './NewGroup';
//---------------
import Story from '../views/Story/Story';
import styles from '../views/Login/Login.styles';
import LoginScreen from '../views/Login/Login';
import RegisterScreen1 from '../views/Register/Register1';
import RegisterScreen2 from '../views/Register/Register2';
import RegisterScreen3 from '../views/Register/Register3';

import { auth } from '../services/config_firebase'
//-------------------
const Stack = createNativeStackNavigator();
//-------------------
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../redux/reducers';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk));

const logo = require('../../assets/images/blueberry_text_logo_rev03.png');


export class Router extends React.Component {
  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }

  }

  componentDidMount() {
    
    auth.onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }


  render() {

    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={styles.containerAnimacao}>
          <Image source={logo}
            style={styles.imagem}
          />  
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
             
            <Stack.Screen name="Register1" component={RegisterScreen1} navigation={this.props.navigation} options={{ headerShown: false }} />
            <Stack.Screen name="Register2" component={RegisterScreen2} navigation={this.props.navigation} options={{ headerShown: false }} />
            <Stack.Screen name="Register3" component={RegisterScreen3} navigation={this.props.navigation} options={{ headerShown: false }} />
            
            <Stack.Screen name="Login" navigation={this.props.navigation} component={LoginScreen} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      )      
    } 

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
           
            <Stack.Screen name="BottomTab" component={BottomTab} navigation={this.props.navigation} />
            <Stack.Screen name="MessageScreen" component={MessageScreen} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
      
            <Stack.Screen name="NewGroup" component={NewGroup} />
      
            <Stack.Screen name="Comment" component={Comment} />
            <Stack.Screen
              name="Story"
              component={Story}
              options={{
                headerShown: false,
                presentation: 'modal',
              }}
            />
            
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>  
    );
     

  }

}

export default Router;