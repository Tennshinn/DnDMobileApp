import React from 'react';
import { View } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/Home';
import ItemEditor from './screens/ItemEditor';
import CharacterEditor from './screens/CharacterEditor';
import CharactersList from './screens/CharactersList';
import PackagesList from './screens/PackagesList';
import PackageEditor from './screens/PackageEditor';
import Inventory from './screens/Inventory';
import ItemDetails from './screens/ItemDetails';
import styles from "./styles";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <View style={styles.body}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ItemEditor" component={ItemEditor} />
          <Stack.Screen name="CharacterEditor" component={CharacterEditor} />
          <Stack.Screen name="CharactersList" component={CharactersList} />
          <Stack.Screen name="ItemDetails" component={ItemDetails} />
          <Stack.Screen name="PackagesList" component={PackagesList} />
          <Stack.Screen name="Inventory" component={Inventory} />
          <Stack.Screen name="PackageEditor" component={PackageEditor} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default MyStack;