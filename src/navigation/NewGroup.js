import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CategoryScreen from '../views/OnboardingScreen/CategoryScreen';
import OnboardingScreen from '../views/OnboardingScreen/OnboardingScreen';
//import ProfilEdit from '../views/ProfileEdit/ProfilEdit';

import GroupNew from '../views/Group/GroupNew';


const Stack = createNativeStackNavigator();

const NewGroup = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="GroupNew"
        component={GroupNew}
        options={{presentation: 'modal'}}
      />
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
    </Stack.Navigator>
  );
};
export default NewGroup;
