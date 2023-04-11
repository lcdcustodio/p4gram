import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';


import Router from './src/navigation/Router';

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="black" />      
        <Router />      
    </SafeAreaProvider>
  );
};
export default App;