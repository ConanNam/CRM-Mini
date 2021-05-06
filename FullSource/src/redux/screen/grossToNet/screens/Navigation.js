import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import GrossToNet from './GrossToNet';
import Home from './Home';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

function GTN() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GrossToNet"
        component={GrossToNet}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}

export default GTN;
