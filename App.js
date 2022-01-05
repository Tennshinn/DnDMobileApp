import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Home';
import ItemEditor from './screens/ItemEditor';
import CreateCharacter from './screens/CreateCharacter';
import Characters from './screens/Characters';
import Packages from './screens/Packages';
import PackageEditor from './screens/PackageEditor';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ItemEditor" component={ItemEditor} />
        <Stack.Screen name="CreateCharacter" component={CreateCharacter} />
        <Stack.Screen name="CharactersList" component={Characters} />
        <Stack.Screen name="Packages" component={Packages} />
        <Stack.Screen name="PackageEditor" component={PackageEditor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;