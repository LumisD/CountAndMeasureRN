import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ListsScreen from './src/screens/ListsScreen';
import NewScreen from './src/screens/NewScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import CountScreen from './src/screens/CountScreen';
import AddNewItemScreen from './src/screens/AddNewItemScreen';

// Define type-safe navigation params
export type RootStackParamList = {
  Tabs: undefined;
  Count: {unionId: number};
  AddNewItem: {serializedItemType: string};
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Lists" component={ListsScreen} />
      <Tab.Screen name="New" component={NewScreen} />
      <Tab.Screen name="Privacy" component={PrivacyPolicyScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Count" component={CountScreen} />
        <Stack.Screen name="AddNewItem" component={AddNewItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
