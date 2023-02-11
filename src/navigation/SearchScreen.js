import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Message from '../views/Message/Message';
import SingleMessage from '../views/Message/SingleMessage';

import Search from '../views/Search/Search';
import Search_details from '../views/Search/Search_details';
//import SingleMessage from '../views/Message/SingleMessage';
//import Account from '../views/Account/Account';

const Stack = createNativeStackNavigator();

const SearchScreen = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Search_details" component={Search_details} />      
      {/* 
      <Stack.Screen name="Account" component={Account} />      
      */}
    </Stack.Navigator>
  );
};
export default SearchScreen;
