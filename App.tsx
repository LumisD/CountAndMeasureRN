import React from 'react';
import './src/locales/i18n';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import ListsScreen from './src/screens/ListsScreen';
import NewScreen from './src/screens/NewScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import CountScreen from './src/screens/CountScreen';
import AddNewItemScreen from './src/screens/AddNewItemScreen';
import {RootStackParamList} from './src/navigation/types';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function TabNavigator() {
  const {t} = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Lists"
        component={ListsScreen}
        options={{title: t('lists')}}
      />
      <Tab.Screen
        name="New"
        component={NewScreen}
        options={{title: t('_new')}}
      />
      <Tab.Screen
        name="Privacy"
        component={PrivacyPolicyScreen}
        options={{title: t('privacy')}}
      />
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
