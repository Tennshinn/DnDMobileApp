import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Home';
import ItemEditor from './screens/ItemEditor';
import CreateCharacter from './screens/CreateCharacter';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ItemEditor" component={ItemEditor} />
        <Stack.Screen name="CreateCharacter" component={CreateCharacter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;