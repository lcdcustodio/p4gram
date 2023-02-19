import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Account from '../views/Account/Account';
import SinglePost from '../views/ProfilPost/SinglePost';
import Settings from '../views/Settings/Settings';

import GroupNew from '../views/Group/GroupNew';
const AccountScreen = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Settings" component={Settings} />
      {/* 
      <Stack.Screen name="GroupNew" component={GroupNew} options={{presentation: 'modal'}}/>
      */}
      <Stack.Screen name="SinglePost" component={SinglePost} options />
    </Stack.Navigator>
  );
};
export default AccountScreen;
